import { UserWordParameters } from '../js/types';
import { setItemToLocalStorage } from '../js/localStorage';
import { removeDifficultWord } from './difficultPage';
import { createUserWord } from '../js/api';
import { myId } from '../card/cardElement';

export const learnedWords: Array<string> = [];

export function learnedWord() {
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('delete')) {
        const wordId = (<HTMLButtonElement>e.target).id.split('delete')[1];
        const word = document.getElementById(`${wordId}`);
        console.log(wordId, word);
        if (word) word.classList.add('learned-word');
        (<HTMLButtonElement>e.target).disabled = true;
        (<HTMLButtonElement>e.target).classList.add('opacity');
        learnedWords.push(wordId);
        setItemToLocalStorage('learnedWords', JSON.stringify(learnedWords));
        const body: UserWordParameters = {
          difficulty: 'learned-word',
          optional: { testFieldString: 'test', testFieldBoolean: true },
        };
        removeDifficultWord();
        await createUserWord(myId, wordId, body);
      }
    }
  });
}
export default learnedWord;
