import { Question1 } from './data/Question1';
import { Round1 } from './data/Round1';

const PLAYED_QUESTIONS = 'playedQuestions';
const PLAYED_ROUNDS = 'playedRounds';
const IS_RECREATE_DEFAULT = true;
const LEVEL_PAGE = 'currentPage';
const QUESTIONS_PER_DEY = 'questionsPerDay';
const TRUE_PER_DAY = 'truePerDay';

let questionsPerDay = 0;
let truePerDay = 0; //this.question.isAnsweredCorrectly = unswer === this.question.correctAnswer; +1
//если играл значит +1 и обнулять ежедневно?

//isAnsweredCorrectly: false - 0, если правда - то +1, после  неправды - число в счетчик и потом еще в псевдомассив и потом максимум
//
let isInit = false;

if (!isInit) {
  createPlayedQuestion();
  createPlayedRounds();
  isInit = true;
}

function createPlayedQuestion(recreate = IS_RECREATE_DEFAULT): void {
  const item = getPlayedQuestions();
  if (recreate || !Array.isArray(item)) {
    window.localStorage.setItem(PLAYED_QUESTIONS, JSON.stringify([]));
  }
}

function createPlayedRounds(recreate = IS_RECREATE_DEFAULT): void {
  const item = getPlayedRounds();
  //roundsPerDay++ TODO: upgtate inLocalStorage
  if (recreate || !Array.isArray(item)) {
    window.localStorage.setItem(PLAYED_ROUNDS, JSON.stringify([]));
  }
}

export function addPlayedQuestion(question: Question1): void {
  const questions = JSON.parse(<string>window.localStorage.getItem(PLAYED_QUESTIONS));
  questions.push(question);
  window.localStorage.setItem(PLAYED_QUESTIONS, JSON.stringify(questions));
}

export function getPlayedQuestions(): Question1[] {
  return JSON.parse(<string>window.localStorage.getItem(PLAYED_QUESTIONS));
}

export function getLevelPage(): string {
  return JSON.parse(<string>window.localStorage.getItem(LEVEL_PAGE));
}

export function getPlayedRounds(): Question1[] {
  return JSON.parse(<string>window.localStorage.getItem(PLAYED_ROUNDS));
}

export function clearPlayedQuestions(): void {
  createPlayedQuestion();
}

export function finishRound(groupId: number) {
  const question = getPlayedQuestions();
  const round = new Round1(groupId, question);
  window.localStorage.setItem(
    PLAYED_ROUNDS,
    JSON.parse(<string>window.localStorage.getItem(PLAYED_ROUNDS)).push(round)
  );
  clearPlayedQuestions();
}
