import { renderGameRound } from './roundRender';
import { sound } from './questionRenderer';

export function renderGame(): any {
  //TODO: normal type
  let gameSectionDescribe = document.createElement('div');
  gameSectionDescribe.classList.add('describtion-game1');
  let gameName = document.createElement('h2');
  gameName.classList.add('round-choose');
  gameName.textContent = 'Аудиовызов';
  let gameDescription = document.createElement('p');
  gameDescription.classList.add('game-description');
  gameDescription.textContent = 'Цель игры: выбрать правильный перевод услышанного слова.';

  gameName.appendChild(gameDescription);
  const levelOfRound = document.createElement('div');
  levelOfRound.classList.add('levelsGame1');
  levelOfRound.innerHTML = `
  <button id="levelGame0" class="game1 level1">Level 1</button>
  <button id="levelGame1" class="game1 level2">Level 2</button>
  <button id="levelGame2" class="game1 level3">Level 3</button>
  <button id="levelGame3" class="game1 level4">Level 4</button>
  <button id="levelGame4" class="game1 level5">Level 5</button>
  <button id="levelGame5" class="game1 level6">Level 6</button>`;
  gameSectionDescribe.appendChild(gameName);
  gameSectionDescribe.appendChild(levelOfRound);

  const buttons = Array.from(gameSectionDescribe.getElementsByClassName('game1'));

  buttons.forEach((e: Element) => {
    e.addEventListener('click', async () => {
      let groupRoundIdGame1 = +e.id.slice(-1);
      console.log(`click on сложность ${e.id.slice(-1)}`);
      gameSectionDescribe.innerHTML = '';
      const questionSectionsArray = await renderGameRound(groupRoundIdGame1);
      questionSectionsArray.forEach((q) => gameSectionDescribe.appendChild(q));
    });
  });

  let gameDescriptionKey = document.createElement('h5');
  gameDescriptionKey.textContent = '(выбери сложность 1..6 с клавиатура или мышкой)';
  gameDescriptionKey.classList.add('key-game1');
  gameSectionDescribe.appendChild(gameDescriptionKey);

  document.addEventListener('keyup', async function (e: KeyboardEvent) {
    const levelsGame1Btns = document.querySelector('.levelsGame1');
    if (levelsGame1Btns) {
      let groupRoundIdGame1;
      if (e.key === '1') {
        groupRoundIdGame1 = 0;
      } else if (e.key === '2') {
        groupRoundIdGame1 = 1;
      } else if (e.key === '3') {
        groupRoundIdGame1 = 2;
      } else if (e.key === '4') {
        groupRoundIdGame1 = 3;
      } else if (e.key === '5') {
        groupRoundIdGame1 = 4;
      } else if (e.key === '6') {
        groupRoundIdGame1 = 5;
      } else {
        return;
      }
      gameSectionDescribe.innerHTML = '';
      const questionSectionsArray = await renderGameRound(groupRoundIdGame1);
      questionSectionsArray.forEach((q) => gameSectionDescribe.appendChild(q));
    }

    const game1 = <HTMLElement>(
      Array.from(document.querySelectorAll('.round-game1')).find((e) => !e.classList.contains('hide-game1'))
    );

    const game1SoundBtn = <HTMLElement>game1.querySelector('button.game1-sound');
    const nextBtn = <HTMLElement>game1.querySelector('button.next-round');
    const firstBtn = <HTMLElement>game1.querySelector('button.first');
    const secondBtn = <HTMLElement>game1.querySelector('button.second');
    const thirdBtn = <HTMLElement>game1.querySelector('button.third');
    const foughtBtn = <HTMLElement>game1.querySelector('button.fought');
    if (game1SoundBtn) {
      if (e.key === 'Enter') {
        game1SoundBtn.click();
      }
    }

    if (nextBtn) {
      if (e.key === ' ') {
        nextBtn.click();
      }
    }

    if (firstBtn) {
      if (e.key === '1') {
        firstBtn.click();
      }
    }

    if (secondBtn) {
      if (e.key === '2') {
        secondBtn.click();
      }
    }

    if (thirdBtn) {
      if (e.key === '3') {
        thirdBtn.click();
      }
    }

    if (foughtBtn) {
      if (e.key === '4') {
        foughtBtn.click();
      }
    }
  });

  return gameSectionDescribe;
}
