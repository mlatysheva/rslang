import { Word } from '../../js/types';
import { shuffleArray } from './helper';
import { NUMBER_OF_ANSWERS_PER_QUESTION } from '../../js/constants';

export class Question1 {
  isAnswered: boolean = false;

  isAnsweredCorrectly: boolean = false;

  correctAnswer: string;

  answersArray: string[];

  audioId: string;

  word: Word;

  constructor(word: Word, arrayOfUniquePossibleAnswers: string[]) {
    this.word = word;
    this.correctAnswer = word.word;
    this.answersArray = Question1.getAnswers(this.correctAnswer, arrayOfUniquePossibleAnswers);
    this.audioId = word.audio;
  }

  static getAnswers(correctAnswer: string, uniqueAnswersArr: string[]) {
    let resultArray = [correctAnswer];
    while (resultArray.length !== NUMBER_OF_ANSWERS_PER_QUESTION) {
      const randomAnswerIndex = Math.floor(Math.random() * uniqueAnswersArr.length);
      const randomAnswer = uniqueAnswersArr[randomAnswerIndex];
      if (randomAnswer !== correctAnswer && !resultArray.includes(randomAnswer)) {
        resultArray.push(randomAnswer);
      }
    }

    resultArray = shuffleArray(resultArray);

    return resultArray;
  }
}
export default Question1;
