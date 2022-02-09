import { getWord } from '../card/httpDataGetter';
import { Question1 } from './data/Question1';
import { QuestionRenderer } from './questionRenderer';

const arrOfUnswers = ['кот', 'скот', 'крот', 'жpет'];

export async function renderGame1Round(id: string): Promise<HTMLElement> {
  const word = await getWord(id);
  const question = new Question1(word, []);
  const wordRound = new QuestionRenderer(question).render();
  //console.log(`click on ${id}`);
  return wordRound;
}
