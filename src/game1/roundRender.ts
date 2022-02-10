import { getWord, getWords } from '../js/api';
import { Word } from '../js/types';
import { shuffleArray } from './data/helper';
import { Question1 } from './data/Question1';
import { QuestionRenderer } from './questionRenderer';

export async function renderGameRound(group: number, page = Math.floor(Math.random() * 30)): Promise<HTMLElement[]> {
  let words = await getWords(group, page);

  const possibleAnswersArray = words.map((w) => w.word);
  let wordsToPlay = shuffleArray(words);
  wordsToPlay.length = 10;
  let questionsSectionsArray = wordsToPlay
    .map((w: Word) => new Question1(w, possibleAnswersArray))
    .map((q: Question1) => new QuestionRenderer(q).render());
  questionsSectionsArray[0].classList.remove('hide-game1');
  return questionsSectionsArray;
}
