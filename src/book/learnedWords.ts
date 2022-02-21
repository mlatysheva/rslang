import { UserWordParameters } from '../js/types';
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import {
  createUserWord, getUserLearnedWords, deleteUserWord,
} from '../js/api';
import { myId } from '../card/cardElement';
import { ALL_WORDS } from '../js/constants';
import { setLearnedWords } from '../game1/statisticsApiHelper';

export const learnedWords: Array<string> = [];

export const learnedDayWords: Array<string> = [];

export function learnedWord() {
  document.body.addEventListener(
    'click',
    async (e): Promise<void> => {
      if (e.target) {
        if ((<HTMLButtonElement>e.target).classList.contains('delete')) {
          const wordId = (<HTMLButtonElement>e.target).id.split('delete')[1];
          const word = document.getElementById(`${wordId}`);
          if (word) word.classList.add('opacity');
          word?.classList.remove('difficult-word');
          (<HTMLButtonElement>e.target).disabled = true;
          (<HTMLButtonElement>e.target).classList.add('opacity');
          learnedWords.push(wordId);
          setItemToLocalStorage('learnedWords', JSON.stringify(learnedWords));
          const body: UserWordParameters = {
            difficulty: 'learned-word',
          };
          await deleteUserWord(myId, wordId);
          await createUserWord(myId, wordId, body);
          await setLearnedWords(learnedWords.length);
        }
      }
    },
  );
}

export const numberDayLearnedWords = () => {
  if (getItemFromLocalStorage('learnedWords')) {
    const number = getItemFromLocalStorage('learnedWords').split(',').length;
    return number;
  }
  return 0;
};

export const numberLearnedWords: Array<number> = [];
export const getNumberLernedWords = async () => {
  if (!getItemFromLocalStorage('id')) {
    return;
  }
  const diffWordsId = await getUserLearnedWords(myId);
  const count = diffWordsId[0].totalCount[0];
  if (!count) {
    return;
  }
  const numberWords: number = Object.values(count)[0];
  numberLearnedWords.push(numberWords);
  if (isNaN(numberWords)) {
    numberLearnedWords.push(0);
  }
};
getNumberLernedWords();

export const percentLearnedWords = (numberWords: number) => {
  const allWords = ALL_WORDS;
  let percent = (numberWords / allWords) * 100;
  if (isNaN(percent)) {
    percent = 0;
  }
  return percent.toFixed(2);
};
export const dayWords = numberDayLearnedWords();

export default { learnedWord, percentLearnedWords };
