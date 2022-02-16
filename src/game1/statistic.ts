import { linkForCard } from '../js/constants';
import { getPlayedQuestions } from './localStorageHelper';

export function renderLatestGameStatistics() {
  let statisticGame1 = document.createElement('div');
  statisticGame1.classList.add('statistic-game1');
  const table = renderTable();
  const unswers = document.createElement('div');
  unswers.classList.add('table-game1');
  unswers.innerHTML = `
    <div class="results"><h2>Результаты:</h2>
      <table class='statistics-game1'>
        <tbody class='results-game1'>   
        </tbody>
      </table>
          `;
  unswers.querySelector(`.statistics-game1 tbody`)?.appendChild(table);
  statisticGame1.appendChild(unswers);
  return statisticGame1;
}

function renderTable() {
  const questions = getPlayedQuestions();
  const statistics = document.createElement('div');

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const row = document.createElement('div');
    row.classList.add('table-row');
    if (i % 2 === 0) {
      row.classList.add('row-2');
    }
    //TODO:before arr length

    let correctWord = q.correctAnswerEnglish.toLocaleLowerCase();
    let correctTranskription = q.word.transcription;
    let correctTranslate = q.word.wordTranslate;

    let isCorrect = 'sprint-result-correct';
    if (q.isAnsweredCorrectly === false) {
      isCorrect = 'sprint-result-incorrect';
    }

    /*row.innerHTML = `<tr>
            <td class='sound-btn'><button id='statistic-${q.word.id}' class='player-icon play'></button></td>
            <td class='correct-word'>${correctWord}</td>
            <td class='correct-transkription'>${correctTranskription}</td>
            <td class='correct-translate'>${correctTranslate}</td>
            <td class='correct-is'>${isCorrect}</td>
          </tr>`;*/

    let trOne = document.createElement('tr');
    trOne.classList.add('game1-results');
    let tdOne = document.createElement('td');
    tdOne.classList.add('game1-results');
    let tdOneBtn = document.createElement('button');
    tdOneBtn.classList.add('player-icon');
    tdOneBtn.classList.add('play');
    tdOneBtn.setAttribute('id', `statistic-${q.word.id}`);
    let tdTwo = document.createElement('td');
    tdTwo.classList.add('game1-results');
    tdTwo.innerText = `  ${correctWord}  `;

    let tdThree = document.createElement('td');
    tdThree.classList.add('game1-results');
    tdThree.innerText = `${correctTranskription}`;

    let tdFour = document.createElement('td');
    tdFour.classList.add('game1-results');
    tdFour.innerText = `${correctTranslate}`;

    let tdFive = document.createElement('td');
    tdFive.classList.add('game1-results');
    tdFive.classList.add('sprint-icon');
    tdFive.classList.add('sprint-size');
    tdFive.classList.add(`${isCorrect}`);

    tdOne.appendChild(tdOneBtn);
    trOne.appendChild(tdOne);
    trOne.appendChild(tdTwo);
    trOne.appendChild(tdThree);
    trOne.appendChild(tdFour);
    trOne.appendChild(tdFive);
    row.appendChild(trOne);

    statistics.appendChild(row);
    let elemAudio = <HTMLElement>row.querySelector('button.player-icon');
    elemAudio?.addEventListener('click', sound(`statistic-${q.word.id}`, q.word.audio));
  }

  return statistics;
}

export function sound(id: string, recordPath: string): (e: MouseEvent) => void {
  return function () {
    const changeSoundBtn = document.getElementById(id) as HTMLElement;
    const audio = new Audio();
    const audioSrc = `${linkForCard}${recordPath}`;

    function getValue() {
      return audioSrc;
    }

    function playAudio() {
      audio.src = `${audioSrc}`;
      audio.currentTime = 0;
      audio.play();
    }

    function pauseAudio() {
      audio.pause();
    }

    function changePlayBtn() {
      changeSoundBtn.classList.toggle('pause');
      changeSoundBtn.classList.toggle('play');
      if (changeSoundBtn.classList.contains('play')) {
        pauseAudio();
      } else {
        getValue();
        playAudio();
      }
    }
    changePlayBtn();
  };
}
