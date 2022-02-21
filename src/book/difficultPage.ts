/* eslint-disable no-inner-declarations */
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';

import { createUserWord, getUserLearnedWords, deleteUserWord, getUserDifficultWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { UserWordParameters } from '../js/types';
import { WORDS_PER_PAGE, NUMBER_DIFFERENT_GROUP } from '../js/constants';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];

export const myId: string = getItemFromLocalStorage('id');
const deleteBtn = document.querySelector<HTMLButtonElement>('delete');
const prevButton = document.querySelector<HTMLButtonElement>('prev');
const nextButton = document.querySelector<HTMLButtonElement>('next');
const counter = document.querySelector<HTMLDivElement>('.counter');
const difficultGroup = NUMBER_DIFFERENT_GROUP;
const ifDifficultGroup = true;

export function removeCard() {
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        const cardToDelete = document.getElementById(`${id}`);
        deletedCards.push(id);
        setItemToLocalStorage('deletedCards', JSON.stringify(deletedCards));
        // if (cardToDelete) cardToDelete.remove();
      }
    }
  });
}

export function difficultWord() {
  document.body.addEventListener(
    'click',
    async (e): Promise<void> => {
      if (e.target) {
        if ((<HTMLButtonElement>e.target).classList.contains('difficult')) {
          const wordId = (<HTMLButtonElement>e.target).id.split('difficult')[1];
          const word = document.getElementById(`${wordId}`);
          if (word) word.classList.add('difficult-word');
          (<HTMLButtonElement>e.target).disabled = true;
          // if (deleteBtn && deleteBtnId === wordId) deleteBtn.disabled = true;
          (<HTMLButtonElement>e.target).classList.add('opacity');
          difficultWords.push(wordId);
          setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
          const body: UserWordParameters = {
            difficulty: 'difficult-word',
            // optional: {  },
          };
          await deleteUserWord(myId, wordId);
          await createUserWord(myId, wordId, body);
        }
      }
    }
  );
}

export async function removeDifficultWord() {
  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        deletedCards.push(id);
        await deleteUserWord(myId, id);
        if (ifDifficultGroup) {
          const cardToDelete = document.getElementById(`${id}`);
          // if (cardToDelete) cardToDelete.remove();
        }
      }
    }
  });
}

export async function renderDifficultPage() {
  document.body.addEventListener('click', async (e) => {
    const cardsOnPage = document.querySelector('.book-page');
    const pagination = document.querySelector('.pagination');
    if (e.target) {
      const id = (e.target as HTMLElement).id.split('level')[1];
      if (id === difficultGroup.toString()) {
        if (cardsOnPage) cardsOnPage.innerHTML = '';

        const diffWordsId = await getUserDifficultWords(myId);
        const diffWords = diffWordsId[0].paginatedResults;
        const count = diffWordsId[0].totalCount[0];
        const numberWords = Object.values(Object.values(count))[0];
        console.log(numberWords);
        pagination?.classList.toggle('hide');
        const difficultBtn = document.querySelectorAll('difficult');
        difficultBtn.forEach((btn) => {
          btn.classList.add('hide');
        });

        if (diffWords) {
          diffWords.forEach(async (item) => {
            const cardOnPage = new CardElement(item).renderCard();
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
            cardOnPage.classList.add('difficult-word');
          });
        }
      }
    }
  });
}

export const numberForStatistic: Array<number> = [];
export const numberLearnedWords: Array<number> = [];

export const getNumberDiffWords = async () => {
  if (!getItemFromLocalStorage('id')) {
    return;
  }
  const diffWordsId = await getUserDifficultWords(myId);
  const count = diffWordsId[0].totalCount[0];
  if (!count) {
    return;
  }
  const numberWords = Object.values(count)[0];
  numberForStatistic.push(numberWords);
  return numberWords;
};

getNumberDiffWords();

export const getNumberLernedWords = async () => {
  if (!getItemFromLocalStorage('id')) {
    return;
  }
  const diffWordsId = await getUserLearnedWords(myId);
  const count = diffWordsId[0].totalCount[0];
  if (!count) {
    return;
  }
  const numberWords = Object.values(count)[0];
  numberLearnedWords.push(numberWords);
  return numberWords;
};

getNumberLernedWords();

export default {
  removeCard,
  difficultWord,
  renderDifficultPage,
  getNumberDiffWords,
  numberForStatistic,
  numberLearnedWords,
};
