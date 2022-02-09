import { Question1 } from './data/Question1';
import { Round1 } from './data/Round1';

const PLAYED_QUESTIONS = 'playedQuestions';
const PLAYED_ROUNDS = 'playedRounds';

export function addPlayedQuestion(question: Question1): void {
  const questions = JSON.parse(<string>window.localStorage.getItem(PLAYED_QUESTIONS));
  questions.push(question);
  window.localStorage.setItem(PLAYED_QUESTIONS, JSON.stringify(questions));
}

export function createPlayedQuestion(): void {
  window.localStorage.setItem(PLAYED_QUESTIONS, JSON.stringify([]));
}

export function getPlayedQuestions(): Question1[] {
  return JSON.parse(<string>window.localStorage.getItem(PLAYED_QUESTIONS));
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
