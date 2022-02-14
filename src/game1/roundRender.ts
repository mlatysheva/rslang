import { getWord, getWords } from '../js/api';
import { Word } from '../js/types';
import { shuffleArray } from './data/helper';
import { Question1 } from './data/Question1';
import { QuestionRenderer } from './questionRenderer';
import { PAGES_PER_GROUP, UNSWERS_PER_GAME } from '../js/constants';

export async function renderGameRound(
  group: number,
  page = Math.floor(Math.random() * PAGES_PER_GROUP)
): Promise<HTMLElement[]> {
  let words = await getWords(group, page);

  const possibleAnswersArray = words.map((w) => w.wordTranslate);
  let wordsToPlay = shuffleArray(words);
  wordsToPlay.length = UNSWERS_PER_GAME;
  let questionsSectionsArray = wordsToPlay
    .map((w: Word) => new Question1(w, possibleAnswersArray))
    .map((q: Question1) => new QuestionRenderer(q).render());
  questionsSectionsArray[0].classList.remove('hide-game1');
  return questionsSectionsArray;
}
export default renderGameRound;