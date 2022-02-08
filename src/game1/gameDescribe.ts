import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';
import { renderGame1Round } from './roundRender';

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
  console.log(`buttons ${buttons.length}`);
  buttons.forEach((e: Element) => {
    e.addEventListener('click', async () => {
      gameSectionDescribe.innerHTML = '';
      gameSectionDescribe.appendChild(await renderGame1Round('5e9f5ee35eb9e72bc21af4a4'));
    });
  });

  return gameSectionDescribe;
}
