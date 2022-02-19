import { getItemFromLocalStorage } from "../js/localStorage";
import { SprintWord } from "../js/types";
import { sprintNewWords } from "../statistics/globalStorage";
import { countdown } from "./countDown";
import { findSprintLongestSeries, getArrayOfWords, getRandomAnswers, getRandomNumber, playsound, postWordToServer, refreshPoints, renderLevel, replay } from "./sprintUtils";


// render main sprint game screen depending on the level chosen

export async function startSprintRound(level: number) {
  const initialScreen = <HTMLElement>document.querySelector('.sprint-start-screen');
  (<HTMLElement>initialScreen).classList.add('hide');

  const parentDiv = <HTMLElement>document.querySelector('.sprint-view');

  const gameScreen = <HTMLElement>document.createElement('div');
  gameScreen.classList.add('sprint-game-screen');

  let html = `
    <div class="first-line-wrapper sprint-wrapper">   
      <button class="replay-button" id="sprint-replay-button" title="К выбору уровня"></button>
      <div class="sprint-points"><span class="sprint-text">Очки: </span><span id="sprint-points">0</span></div>
      <div class="sprint-text">Уровень <span id="sprint-level"></span></div>
    </div>

    <button class="button sprint-start-button">Начать</button>

    <div class="timer-wrapper">
      <div class="clock-image"></div>
      <div class="timer" id="counter"></div>
    </div>
    
    <div class="question-wrapper">
      <span class="sprint-word english-word" id="sprint-english-word"></span>
      <span class="is"> значит </span>
      <span class="sprint-word translation" id="sprint-translation"></span>?
    </div>
    <div class="sprint-controls-wrapper" id="sprint-controls">
      <div class="button sprint-answer-button sprint-correct" id="sprint-correct-btn">Верно</div>
      <div class="button sprint-answer-button sprint-incorrect" id="sprint-incorrect-btn">Неверно</div>
    </div> 
    <div class="text-box">      
      <p class="text-message"><span class="bold-text">Для игры с клавиатуры жми:</span> 
        <br><span class="uppercase-text bold-text">Enter</span> - "Начать", <span class="uppercase-text bold-text">Backspace</span> или <span class="uppercase-text bold-text">Delete</span> - "Возврат к выбору уровня"
        <br><span class="uppercase-text bold-text">Левая стрелка</span> - "Верно", <span class="uppercase-text bold-text">Правая стрелка</span> - "Неверно"
      </p>
    </div>   
  `;

  gameScreen.innerHTML = html;
  (<HTMLElement>parentDiv).appendChild(gameScreen);

  // change to intiail screen if replay button is clicked
  const replayBtn = gameScreen.querySelector('.replay-button');
  (<HTMLElement>replayBtn).addEventListener('click', () => {
    replay();
  });

  renderLevel(level);
}

// main function for sprint game

export async function startSprintGame(level: number) {
  if (level == 7) {
    level = 6;
  }
  let points: number = 0;
  let index: number = 0;
  let words = await getArrayOfWords(level);
  let results: SprintWord[] = [];
  let arrayof1and0: number[] = [];

  await startSprintRound(level);

  const sprintStartBtn = <HTMLButtonElement>document.querySelector('.sprint-start-button');
  const replayBtn = <HTMLButtonElement>document.getElementById('sprint-replay-button');

  // manipulate start and replay by mouse click

  (<HTMLButtonElement>sprintStartBtn).addEventListener('click', () => {

    const sprintStartBtn = <HTMLButtonElement>document.querySelector('.sprint-start-button');
    const replayBtn = <HTMLButtonElement>document.getElementById('sprint-replay-button');
  
    sprintStartBtn.disabled = true;
    replayBtn.disabled = true;

    const englishWord = <HTMLElement>document.getElementById('sprint-english-word');
    const translation = <HTMLElement>document.getElementById('sprint-translation');
    englishWord.innerHTML = words[0].word;
    translation.innerHTML = words[0].wordTranslate;

    game();

    countdown();

    let watching = setInterval(() => {
      const counter = (<HTMLElement>document.getElementById('counter')).innerText;
      if (counter == '0:00') {
        clearInterval(watching);
        renderSprintResults(results);
        findSprintLongestSeries(arrayof1and0);
      }
    }, 1000);
  });

  // manipulate start and replay from keyboard

  document.body.addEventListener('keyup', async (e: KeyboardEvent) => {

    if (e.key === 'Enter') {
      sprintStartBtn.click();
    }
    if (e.key === 'Backspace') {
      replayBtn.click();
    }
  });

  function game() {
    const controls = document.getElementById('sprint-controls');
    const userId = JSON.parse(localStorage.getItem('id') as string);

    // to make the first word work
    let correctAnswer = words[index].wordTranslate;

    (<HTMLElement>controls).addEventListener('click', async (event) => {
      const englishWord = <HTMLElement>document.getElementById('sprint-english-word');
      const translation = <HTMLElement>document.getElementById('sprint-translation');      
      const wordId = words[index].id;

      // case where the answer is correct
      if (
        ((<HTMLElement>event.target).id === 'sprint-correct-btn' &&
          (<HTMLElement>translation).innerText === correctAnswer) ||
        ((<HTMLElement>event.target).id === 'sprint-incorrect-btn' &&
          (<HTMLElement>translation).innerText != correctAnswer)
      ) {
        points++;
        refreshPoints(points);

        results.push({id: wordId, sound: words[index].audio, word: words[index].word, translation: words[index].wordTranslate, isCorrectlyAnswered: true});
        
        arrayof1and0.push(1);
        
        // interact with the server for a registered user

        if (getItemFromLocalStorage('token')) {
          postWordToServer(userId, wordId, 1); 
        }

        // add new word to global sprintLearnedWords array and to LS
        sprintNewWords.push(wordId);
        localStorage.setItem('sprintNewWords', JSON.stringify(sprintNewWords));
      } else {
        results.push({
          id: wordId,
          sound: words[index].audio,
          word: words[index].word,
          translation: words[index].wordTranslate,
          isCorrectlyAnswered: false,
        });

        arrayof1and0.push(0);

        // interact with the server for a registered user

        if (getItemFromLocalStorage('token')) {
          postWordToServer(userId, wordId, 0);  
        }

        // remove learned word from learnedWords array and from LS

        if (sprintNewWords.includes(wordId))  {
          const index = sprintNewWords.indexOf(wordId);

          if (index > -1) {
            sprintNewWords.splice(index, 1);
            localStorage.setItem('sprintNewWords', JSON.stringify(sprintNewWords));
          }
        }
      }

      index++;

      if (words[index] == null) {
        alert('Ты использовал все доступные слова. Молодец!');
        renderSprintResults(results);
        replay();
      } else {
        let randomAnswers = getRandomAnswers(1, words);
        correctAnswer = words[index].wordTranslate;
        randomAnswers.push(correctAnswer);
        (<HTMLElement>englishWord).innerText = words[index].word;
        (<HTMLElement>translation).innerText = randomAnswers[getRandomNumber(2)];
      }
    });

    // play from keyboard
    const sprintCorrectBtn = document.getElementById('sprint-correct-btn');
    const sprintIncorrectBtn = <HTMLElement>document.getElementById('sprint-incorrect-btn');

    document.body.addEventListener('keyup', async (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {   
        (<HTMLElement>sprintCorrectBtn).click();
      }
      if (e.key === 'ArrowRight') { 
        (<HTMLElement>sprintIncorrectBtn).click();
      }
    });
  }
}

export async function renderSprintResults(array: SprintWord[]) {
  let correctAnswers = array.filter((elem) => elem.isCorrectlyAnswered === true).length;
  let incorrectAnswers = array.filter((elem) => elem.isCorrectlyAnswered === false).length;

  let correctAnswersPercent = ((correctAnswers / array.length) * 100).toFixed();

  let index: number = 0;
  let html = `
    
    <div class="sprint-results">
      <button class="results-replay-btn replay-button" title="К выбору уровня"></button>
      <div class="title sprint-results-title">Твои результаты:</div>
      <div class="results-wrapper">
        <div class="results-summary results-summary-errors">Ошибок: <span class="sprint-results-span" id="sprint-errors">${incorrectAnswers}</span></div>
        <div class="results-summary results-summary-correct">Правильных ответов: <span class="sprint-results-span" id="sprint-correct">${correctAnswers}</span></div>
        <div class="results-summary results-summary-correct">Правильных ответов: <span class="sprint-results-span" id="sprint-correct-percentage">${correctAnswersPercent}%</span></div>
        <div class="results-summary text-message">Для возврата к выбору уровня с клавиатуры жми: 
          <span class="uppercase-text bold-text">Backspace</span> или <span class="uppercase-text bold-text">Delete</span> 
        </div>
      </div>

      <table class="table" id="sprint-results-table">
        <thead>
          <th></th>
          <th>Звук</th>
          <th>Слово</th>
          <th>Перевод</th>
          <th>Результат</th>
        </thead>
        <tbody>
          ${await renderSprintRows(array)}
        </tbody>
      </table> 
    </div> 
  `;
  const resultsView = document.createElement('div');
  resultsView.classList.add('sprint-results-view');
  resultsView.innerHTML = html;

  const gameScreen = <HTMLElement>document.querySelector('.sprint-game-screen');
  gameScreen.classList.add('hide');

  const parentDiv = <HTMLElement>document.querySelector('.sprint-view');
  parentDiv.appendChild(resultsView);

  // Toggle screens by mouse click
  const replayBtn = resultsView.querySelector('.replay-button');
  (<HTMLElement>replayBtn).addEventListener('click', () => {
    replay();
  });

  // Toggle screens by keyboard
  document.body.addEventListener('keyup', async (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      (<HTMLElement>replayBtn).click();
    }
  });

  // Add sound to words in the results table

  playsound();

  // Send results to server statistics


  // if (localStorage.getItem('token')) {

  //   let body = {
  //     "learnedWords": 0,
  //     // "optional": { "sprintNewWords": sprintNewWords.length}
  //   }

  //   await putUserStatistics(body);
  // }
}

export async function renderSprintRows(arrayOfResults: SprintWord[]) {
  let tableRowsHtml = '';
  const resultsBody = document.createElement('tbody');
  resultsBody.classList.add('results-rows');

  arrayOfResults.forEach((word: SprintWord, index: number) => {
    let classForIcon: string;

    if (word.isCorrectlyAnswered) {
      classForIcon = 'sprint-result-correct';
    } else {
      classForIcon = 'sprint-result-incorrect';
    }

    tableRowsHtml += `
    <tr id="word-${word.id}">
      <td>${index + 1}</td>
      <td class="sprint-sound-icon player-icon play" id="sprintResult-${word.sound}"></td>
      <td>${word.word}</td>
      <td>${word.translation}</td>
      <td class="sprint-icon ${classForIcon}"></td>
    </tr>
    `;
  });

  return tableRowsHtml;
}
