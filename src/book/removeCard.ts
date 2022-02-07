import { setItemToLocalStorage } from '../js/localStorage';

export const deletedCards: Array<string> = [];
export const difficultWords: Array<string> = [];

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
  document.body.addEventListener('click', (e) => {
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('difficult')) {
        const id = (e.target as HTMLElement).id.split('difficult')[1];
        const word = document.getElementById(`${id}`);
        if (word) word.classList.add('difficult-word');
        difficultWords.push(id);
        setItemToLocalStorage('difficultWords', JSON.stringify(difficultWords));
      }
    }
  });
}

export default { removeCard, difficultWord };
