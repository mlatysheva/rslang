import { Word } from '../../js/types';
import { Question1 } from './Question1';

export class Round1 {
  currentQuestionInRound = 0;
  complexity: number;
  questionArray: Question1[] = [];

  constructor(complexity: number, wordArray: Word[], arrayOfUniquePossibleAnswers: string[]) {
    this.complexity = complexity;
    this.questionArray = wordArray.map((word) => new Question1(word, arrayOfUniquePossibleAnswers));
  }
}
