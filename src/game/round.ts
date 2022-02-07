import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';

export class Round {
  data: Word;

  constructor(cardDataObject: Word) {
    this.data = cardDataObject;
  }

  renderRound(): any {
    //TODO: normal type
    let gameRound = document.createElement('h2');
    gameRound.classList.add('round');
    gameRound.textContent = 'Слушай';

    return gameRound;
  }
}
