import { getWord } from '../card/httpDataGetter';
import { Round } from './round';

export async function renderGame1Round(id: string): Promise<HTMLElement> {
  const data = await getWord(id);
  const wordRound = new Round(data).renderRound();
  return wordRound;
}
