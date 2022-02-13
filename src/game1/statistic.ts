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
        <tbody>   
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
    //TODO:before arr length

    let correctWord = q.correctAnswer.toLowerCase();
    let correctTranskription = q.word.transcription;
    let correctTranslate = q.word.wordTranslate;

    let isCorrect = '&#9989';
    if (q.isAnsweredCorrectly === false) {
      isCorrect = '&#10060';
    }

    /*row.innerHTML = `<tr>
            <td class='sound-btn'><button id='statistic-${q.word.id}' class='player-icon play'></button></td>
            <td class='correct-word'>${correctWord}</td>
            <td class='correct-transkription'>${correctTranskription}</td>
            <td class='correct-translate'>${correctTranslate}</td>
            <td class='correct-is'>${isCorrect}</td>
          </tr>`;*/

    let trOne = document.createElement('tr');
    let tdOne = document.createElement('td');
    let tdOneBtn = document.createElement('button');
    tdOneBtn.classList.add('player-icon');
    tdOneBtn.classList.add('play');
    tdOneBtn.setAttribute('id', `statistic-${q.word.id}`);

    tdOne.appendChild(tdOneBtn);
    trOne.appendChild(tdOne);
    row.appendChild(trOne);

    statistics.appendChild(row);
    let elemAudio = <HTMLElement>row.querySelector('button.player-icon');
    elemAudio?.addEventListener('click', sound(`statistic-${q.word.id}`, q.word.audio));
  }

  return statistics;
}

function sound(id: string, recordPath: string): (e: MouseEvent) => void {
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
