import { Word } from '../js/types';
import { Question1 } from './data/Question1';

export class StaticticGame1 {
  data: Word;
  question: Question1;

  constructor(cardDataObject: Question1) {
    this.data = cardDataObject.word;
    this.question = cardDataObject;
  }

  statisticRender(): any {}
}
