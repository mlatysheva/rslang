import { Word } from '../../js/types';
import { shuffleArray } from './helper';

const NUMBER_OF_ANSWERS_PER_QUESTION = 4;

export class Question1 {
  isAnswered: boolean = false;
  isAnsweredCorrectly: boolean = false;
  correctAnswer: string;
  answersArray: string[];
  audioId: string;

  constructor(word: Word, arrayOfUniquePossibleAnswers: string[]) {
    this.correctAnswer = word.word;
    this.answersArray = this.getAnswers(this.correctAnswer, arrayOfUniquePossibleAnswers);
    this.audioId = word.audio;
  }

  getAnswers(correctAnswer: string, uniqueAnswersArr: string[]) {
    let resultArray = [correctAnswer];
    while (resultArray.length !== NUMBER_OF_ANSWERS_PER_QUESTION) {
      let randomAnswerIndex = Math.floor(Math.random() * uniqueAnswersArr.length);
      let randomAnswer = uniqueAnswersArr[randomAnswerIndex];
      if (randomAnswer != correctAnswer && !resultArray.includes(randomAnswer)) {
        resultArray.push(randomAnswer);
      }
    }

    resultArray = shuffleArray(resultArray);

    return resultArray;
  }
}