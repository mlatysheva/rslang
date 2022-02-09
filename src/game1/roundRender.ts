import { getWord } from '../card/httpDataGetter';
import { Round } from './round';
import { groupRoundIdGame1 } from './gameDescribe';

export async function renderGame1Round(id: string): Promise<HTMLElement> {
  const data = await getWord(id);
  const wordRound = new Round(data).renderRound();
  //console.log(`click on ${id}`);
  return wordRound;
}
