import { Question1 } from './Question1';

export class Round1 {
  currentQuestionInRound = 0;
  group: number;
  questionArray: Question1[] = [];

  constructor(complexity: number, questionsArray: Question1[]) {
    this.group = complexity;
    this.questionArray = questionsArray;
  }
}
