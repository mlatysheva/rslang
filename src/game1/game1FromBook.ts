import { renderGameRound } from './roundRender';
import { sound } from './questionRenderer';

export function renderGameFromBook(): any {
  //TODO: normal type
  console.log(1111111);

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
  levelOfRound.classList.add('center');
  levelOfRound.innerHTML = `
  <button id="levelGame0" class="game1 level1">Play</button>`;
  gameSectionDescribe.appendChild(gameName);
  gameSectionDescribe.appendChild(levelOfRound);

  const button = gameSectionDescribe.getElementsByClassName('game1');

  /* button.addEventListener('click', async () => {
    /*let groupRoundIdGame1 = ;
    let groupRoundIdGame1 = ;
    gameSectionDescribe.innerHTML = '';
    const questionSectionsArray = await renderGameRound(groupRoundIdGame1);
    questionSectionsArray.forEach((q) => gameSectionDescribe.appendChild(q));
  });
  };*/

  let gameDescriptionKey = document.createElement('h5');
  gameDescriptionKey.textContent = '(для старта нажми на кнопку или Enter)';
  gameDescriptionKey.classList.add('key-game1');
  gameSectionDescribe.appendChild(gameDescriptionKey);

  document.addEventListener('keyup', async function (e: KeyboardEvent) {
    const levelsGame1Btn = document.querySelector('.levelsGame1');
    if (levelsGame1Btn) {
      let groupRoundIdGame1 = 0;
      if (e.key === 'Enter') {
        gameSectionDescribe.innerHTML = '';
        const questionSectionsArray = await renderGameRound(groupRoundIdGame1);
        questionSectionsArray.forEach((q) => gameSectionDescribe.appendChild(q));
      }
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
