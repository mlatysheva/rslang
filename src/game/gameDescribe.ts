import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';

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
  gameSectionDescribe.appendChild(gameName);

  return gameSectionDescribe;
}
