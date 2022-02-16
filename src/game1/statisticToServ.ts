//lerned if true in game 2 times
import { NUM_TRUE_UNSWERS_IN_GAME_TO_BE_LEARNED } from '../js/constants';
import { renderLatestGameStatistics } from './statisticGame1';

//TODO:изученные слова не задействуются в мини-играх, которые запускаются на страницах учебника, но задействуются в мини-играх, которые открываются по ссылке в меню
//remember that you have 2 point of enter to the words
//если при угадывании изученного слова в мини-игре пользователь ошибся, слово удаляется из категории изученных

let unswersCorrect = 12; //TODO: где-то взять
let questions = 28; //TODO:

let newWordsPerDay = 0; //No idea
let precentCorrectAnswersPerDay = Math.ceil((unswersCorrect / questions) * 100);
let longestTrueUnswersPerDay = 0;

export const arrAudiocall = [
  { newWords: `${newWordsPerDay}` },
  { precentCorrectAnswers: `${precentCorrectAnswersPerDay}` },
  { longestTrueUnswers: `${longestTrueUnswersPerDay}` },
];

export const arrGame1toBook = [{ id: 'this.num', wordFromGame1True: 'num true', wordFromGame1False: 'num false' }];

// кроткосрочная: 1-Новых слов 2-Правильных ответов, % 3-Самая длинная серия правильных ответов
// длительная: 1-Новых слов 2-Правильных ответов, % 3-Самая длинная серия правильных ответов

//
