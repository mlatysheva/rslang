import { getWord, getWords } from '../js/api';
import { Question1 } from './data/Question1';
import { QuestionRenderer } from './questionRenderer';
import { groupRoundIdGame1 } from './gameDescribe';

export async function renderGame1Round(): Promise<HTMLElement> {
  const group = groupRoundIdGame1;
  let page = 0; //TODO: or from uchebnik
  const words = await getWords(group, page); //this is first!
  const arrOfUnswers = words.map((w) => w.word);
  let arrOfIdOnPage = words.map((w) => w.id); //all id from page
  let random = Math.floor(Math.random() * arrOfIdOnPage.length);
  let wordId = arrOfIdOnPage[random];

  const word = await getWord(wordId); //random word to try unswer

  const question = new Question1(word, arrOfUnswers);
  const wordRound = new QuestionRenderer(question).render();
  //console.log(`click on ${id}`);
  return wordRound;
}
