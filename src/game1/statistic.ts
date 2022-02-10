import { sound } from '../card/cardElement';

export function renderStatic() {
  let statisticGame1 = document.createElement('div');
  statisticGame1.classList.add('statistic-game1');

  const unswers = document.createElement('div');
  unswers.classList.add('table-game1');
  unswers.innerHTML = `
    <div class="results"><h2>Результаты:</h2>
      <table class='statistics-game1'>
        <tbody>
           ${makeAllStatistic()}            
        </tbody>
      </table>
          `;
  statisticGame1.appendChild(unswers);
  return statisticGame1;
}

function makeAllStatistic() {
  /*getSoundId(): string {
    return `statistic-${this.data.id}`;
  }*/

  // const soundEnableFunction = sound(this);
  let trOne;
  let num = 0;

  for (let i = 0; i < 3; i++) {
    //TODO:before arr length
    let elemAudio = document.querySelector('button.player-icon');
    // elemAudio?.addEventListener('click', soundEnableFunction); TODO: listen

    let correctWord = `this.data.word`;
    let correctTranskription = `this.data.transcription`;
    let correctTranslate = `this.data.wordTranslate`;
    num = num + 1;

    //&#9989 - true
    //&#10060 - false
    trOne = `<tr>
            <td class='num'>${num}</td>
            <td class='sound-btn'><button id='statistic-getSoundId()' class='player-icon play'></button></td>
            <td class='correct-word'>${correctWord}</td>
            <td class='correct-transkription'>${correctTranskription}</td>
            <td class='correct-translate'>${correctTranslate}</td>
            <td class='correct-is'>&#10060</td>
          </tr>`;
    return trOne;
  }

  let trAll = trOne;

  return trAll;
}
