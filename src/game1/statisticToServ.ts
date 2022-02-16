import { getLongestTrueQuestionsPerDay, getQuestionsPerDay, getTrueQuestionsPerDay } from './localStorageHelper';

let unswersCorrect = getTrueQuestionsPerDay();
let questions = getQuestionsPerDay();
let newWordsPerDay = Math.ceil(Math.random() * 20); //TODO: не так должно быть

let precentCorrectAnswersPerDay = Math.ceil((unswersCorrect / questions) * 100);
let longestTrueUnswersPerDay = getLongestTrueQuestionsPerDay();

export const arrAudiocall = [
  { newWords: `${newWordsPerDay}` },
  { precentCorrectAnswers: `${precentCorrectAnswersPerDay}` },
  { longestTrueUnswers: `${longestTrueUnswersPerDay}` },
];

export const arrGame1toBook = [{ id: 'this.num', wordFromGame1True: 'num true', wordFromGame1False: 'num false' }];

// кроткосрочная: 1-Новых слов 2-Правильных ответов, % 3-Самая длинная серия правильных ответов
// длительная: 1-Новых слов 2-Правильных ответов, % 3-Самая длинная серия правильных ответов

//
