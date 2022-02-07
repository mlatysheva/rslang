import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';

export class Round {
  data: Word;

  constructor(cardDataObject: Word) {
    this.data = cardDataObject;
  }

  renderRound(): any {
    //TODO: normal type
    let titleOfCard = document.createElement('h2');
    titleOfCard.classList.add('card-title');
    titleOfCard.textContent = 'round 1';
    return titleOfCard;
  }
}
