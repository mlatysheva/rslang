import { getWord, getWords } from '../js/api';
import { Question1 } from './data/Question1';
import { QuestionRenderer } from './questionRenderer';

export async function renderGame1Round(id: string): Promise<HTMLElement> {
  const word = await getWord(id);
  const words = await getWords(word.page, word.group);
  const arrOfUnswers = words.map((w) => w.word.charAt(0).toUpperCase() + w.word.slice(1));

  const question = new Question1(word, arrOfUnswers);
  const wordRound = new QuestionRenderer(question).render();
  //console.log(`click on ${id}`);
  return wordRound;
}
