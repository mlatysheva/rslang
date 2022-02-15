import { Question1 } from './data/Question1';
import { Round1 } from './data/Round1';

const PLAYED_QUESTIONS = 'playedQuestions';
const PLAYED_ROUNDS = 'playedRounds';
const IS_RECREATE_DEFAULT = true;

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
