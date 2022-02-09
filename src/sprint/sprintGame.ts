import { getWords } from "../js/api";
import { PAGES_PER_GROUP, WORDS_PER_PAGE } from "../js/constants";
import { Word } from "../js/types";
import { countdown } from "./countDown";

let words: Word[] = [];
let points: number = 0;
let index: number = 0;

export async function startSprintGame(level: number) {

  words = await getWords(level, getRandomNumber(PAGES_PER_GROUP));
  

  const initialScreen = <HTMLElement>document.querySelector('.sprint-start-screen');
  (<HTMLElement>initialScreen).classList.add('hide');

  const parentDiv = <HTMLElement>document.querySelector('.sprint-view');

  const gameScreen = <HTMLElement>document.createElement('div');
  gameScreen.classList.add('sprint-game-screen');

  let html = `
    <div class="icon replay-button" title="К выбору уровня"></div>
    <div class="timer-wrapper">
      <div class="clock-image"></div>
      <div class="timer" id="counter"></div>
    </div>
    
    <div class="points"><span class="large-text">Очки: </span><span id="sprint-points">0</span></div>
    <div class="question-wrapper">
      <span class="english-word" id="sprint-english-word">${words[0].word}</span>
      <span class="is"> значит </span>
      <span class="translation" id="sprint-translation">${words[0].wordTranslate}</span>?
    </div>
    <div class="sprint-controls-wrapper" id="sprint-controls">
      <div class="button sprint-answer-button sprint-correct" id="sprint-correct-btn">Верно</div>
      <div class="button sprint-answer-button sprint-incorrect" id="sprint-incorrect-btn">Неверно</div>
    </div>    
  `
  gameScreen.innerHTML = html;
  (<HTMLElement>parentDiv).appendChild(gameScreen);

  const replayBtn = gameScreen.querySelector('.replay-button');
  (<HTMLElement>replayBtn).addEventListener('click', () => {
      gameScreen.classList.add('hide');
      initialScreen.classList.remove('hide');
  })

  const controls = document.getElementById('sprint-controls');
  
  
  controls?.addEventListener("click", (event) => {
    index++;
    const englishWord = <HTMLElement>document.getElementById('sprint-english-word');
    const translation = <HTMLElement>document.getElementById('sprint-translation');

    let randomAnswers = getRandomAnswers(2);
    let correctAnswer = words[index].wordTranslate;
    randomAnswers.push(correctAnswer);
    console.log(`arrayof answers is ${[...randomAnswers]}`);
    (<HTMLElement>englishWord).innerText = words[index].word;

    (<HTMLElement>translation).innerText = randomAnswers[getRandomNumber(3)];
    if ((((<HTMLElement>event.target).id === 'sprint-correct-btn') && ((<HTMLElement>translation).innerText === correctAnswer)) ||  (((<HTMLElement>event.target).id != 'sprint-correct-btn') && ((<HTMLElement>translation).innerText != correctAnswer)))  {
      console.log('Answer is correct');
      points++;
      refreshPoints(points);
    } else {
      console.log('Answer is incorrect');
    }
  })

  countdown();  
}

export function getRandomNumber(num: number) {
  return Math.floor(Math.random() * num);
}

export function getRandomAnswers(num: number) {
  let arrayOfAnswers: string[] = [];

  for (let i = 0; i < num; i++) {
    arrayOfAnswers.push(words[getRandomNumber(WORDS_PER_PAGE)].wordTranslate);
    console.log(`arrayOfAnswers at ${i} is ${arrayOfAnswers[i]}`);
  }
  return arrayOfAnswers;
}

function refreshPoints(points:number) {
  const pointsDiv = document.getElementById('sprint-points');
  (<HTMLElement>pointsDiv).innerText = points.toString();
}