import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';
import { currentGroup } from './paginationBook';
import {
  getWord, createUserWord, getUserWord, getUserWordsAll, deleteUserWord, getUserDifficultWords,
} from '../js/api';
import { CardElement } from '../card/cardElement';
import { UserWordParameters } from '../js/types';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];
export const learnedWords: Array<string> = [];

const myId: string = getItemFromLocalStorage('id');

const deleteBtn = document.querySelector<HTMLButtonElement>('delete');

export function removeCard() {
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        const cardToDelete = document.getElementById(`${id}`);
        deletedCards.push(id);
        setItemToLocalStorage('deletedCards', JSON.stringify(deletedCards));
        if (cardToDelete) cardToDelete.remove();
      }
    }
  });
}

export function difficultWord() {
  document.body.addEventListener('click', async (e):Promise< void> => {
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('difficult')) {
        const wordId = (<HTMLButtonElement>e.target).id.split('difficult')[1];
        const word = document.getElementById(`${wordId}`);
        // const deleteBtnId = (<HTMLButtonElement>deleteBtn).id.split('delete')[1];
        if (word) word.classList.add('difficult-word');
        (<HTMLButtonElement>e.target).disabled = true;
        // if (deleteBtn && deleteBtnId === wordId) deleteBtn.disabled = true;
        (<HTMLButtonElement>e.target).classList.add('opacity');
        difficultWords.push(wordId);
        setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
        const body: UserWordParameters = {
          difficulty: 'difficult-word',
          optional: { testFieldString: 'test', testFieldBoolean: true },
        };
        await createUserWord(myId, wordId, body);
      }
    }
  });
}

export async function removeDifficultWord() {
  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('delete')) {
        const id = (e.target as HTMLElement).id.split('delete')[1];
        deletedCards.push(id);
        await deleteUserWord(myId, id);
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
      if (id === '6') {
        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const diffWordsId = await getUserDifficultWords(myId);
        const diffWords = diffWordsId[0].paginatedResults;
        if (diffWords) {
          diffWords.forEach(async (item) => {
            // eslint-disable-next-line no-underscore-dangle
           // console.log(item, item.word, item._id, item.group);
            const difficultBtn = document.querySelector('difficult');
            const cardOnPage = new CardElement(item).renderCard();
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
            // pagination?.classList.add('hide');
            // difficultBtn?.classList.add('hide');
            // }
            removeDifficultWord();
          });
        }
      }
    }
  });
}
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
        if (currentGroup === 6) {
          const cardToDelete = document.getElementById(`${wordId}`);
          await deleteUserWord(myId, wordId);
          if (cardToDelete) cardToDelete.remove();
        }
        await createUserWord(myId, wordId, body);
      }
    }
  });
}

export default {
  removeCard, difficultWord, renderDifficultPage, learnedWord,
};
