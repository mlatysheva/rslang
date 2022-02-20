/* eslint-disable no-underscore-dangle */
import { getWords, getUserDifficultWords, getUserLearnedWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { setItemToLocalStorage, getItemFromLocalStorage } from '../js/localStorage';

export let currentPage = 0;
export const firstPage = 0;
export const totalPages = 30;
export let currentGroup = 0;

const myId: string = getItemFromLocalStorage('id');

export async function changeLevel() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    const cardsOnPage = document.querySelector('.book-page');
    const level = document.querySelectorAll('.level');

    const pagination = document.querySelector('.pagination');

    level.forEach((button) => {
      button.classList.remove('active-page');
      pagination?.classList.remove('hide');
    });
    if (e.target) {
      if ((<HTMLButtonElement>e.target).classList.contains('level')) {
        const id = +(e.target as HTMLElement).id.split('level')[1];
        (e.target as HTMLElement).classList.add('active-page');
        if (!myId && id === 6) {
          (<HTMLButtonElement>e.target).disabled = true;
          console.log(<HTMLButtonElement>e.target);
        }

        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const data = await getWords(id, firstPage);
        currentPage = firstPage;
        if (myId) {
          const difficultWords = await getUserDifficultWords(myId);
          const diffWords = difficultWords[0].paginatedResults;
          const diffWordsId = diffWords?.map((word) => word._id);

          const learnedWords = await getUserLearnedWords(myId);
          const dataLearnedWords = learnedWords[0].paginatedResults;
          const learnedWordsId = dataLearnedWords?.map((word) => word._id);

          for (let i = 0; i < data.length; ++i) {
            const cardOnPage = new CardElement(data[i]).renderCard();
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);

            if (diffWordsId?.includes(data[i].id) && cardsOnPage) {
              cardOnPage.classList.add('difficult-word');
            }
            if (learnedWordsId?.includes(data[i].id) && cardsOnPage) {
              cardOnPage.classList.add('opacity');
            }
          }
        } else {
          data.forEach((element) => {
            const cardOnPage = new CardElement(element).renderCard();
            if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
          });
        }
        cardsOnPage?.setAttribute('id', `${id}`);
        localStorage.removeItem('currentPage');
        setItemToLocalStorage('currentPage', JSON.stringify(`${id}-${currentPage}`));

        return cardsOnPage;
      }

      return cardsOnPage;
    }
  });
}
export async function prevPage() {
  if (currentPage >= 1) {
    currentPage -= 1;
    const cardsOnPage = document.querySelector('.book-page');
    if (cardsOnPage) {
      currentGroup = (+cardsOnPage.id);
      localStorage.removeItem('currentPage');
      setItemToLocalStorage('currentPage', JSON.stringify(`${currentGroup}-${currentPage}`));
    }

    if (cardsOnPage) cardsOnPage.innerHTML = '';
    const data = await getWords(currentGroup, currentPage);
    if (myId) {
      const difficultWords = await getUserDifficultWords(myId);
      const diffWords = difficultWords[0].paginatedResults;
      const diffWordsId = diffWords?.map((word) => word._id);

      const learnedWords = await getUserLearnedWords(myId);
      const dataLearnedWords = learnedWords[0].paginatedResults;
      const learnedWordsId = dataLearnedWords?.map((word) => word._id);

      for (let i = 0; i < data.length; ++i) {
        const cardOnPage = new CardElement(data[i]).renderCard();
        if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);

        if (diffWordsId?.includes(data[i].id) && cardsOnPage) {
          cardOnPage.classList.add('difficult-word');
        }
        if (learnedWordsId?.includes(data[i].id) && cardsOnPage) {
          cardOnPage.classList.add('opacity');
        }
      }
    } else {
      data.forEach((element) => {
        const cardOnPage = new CardElement(element).renderCard();
        if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
      });
    }
    return cardsOnPage;
  }
}

export async function nextPage() {
  if (currentPage < totalPages) {
    currentPage += 1;
    const cardsOnPage = document.querySelector('.book-page');
    if (cardsOnPage) {
      currentGroup = (+cardsOnPage.id);
      cardsOnPage.innerHTML = '';
      localStorage.removeItem('currentPage');
      setItemToLocalStorage('currentPage', JSON.stringify(`${currentGroup}-${currentPage}`));
    }

    const data = await getWords(currentGroup, currentPage);
    if (myId) {
      const difficultWords = await getUserDifficultWords(myId);
      const diffWords = difficultWords[0].paginatedResults;
      const diffWordsId = diffWords?.map((word) => word._id);

      const learnedWords = await getUserLearnedWords(myId);
      const dataLearnedWords = learnedWords[0].paginatedResults;
      const learnedWordsId = dataLearnedWords?.map((word) => word._id);

      for (let i = 0; i < data.length; ++i) {
        const cardOnPage = new CardElement(data[i]).renderCard();
        if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);

        if (diffWordsId?.includes(data[i].id) && cardsOnPage) {
          cardOnPage.classList.add('difficult-word');
        }
        if (learnedWordsId?.includes(data[i].id) && cardsOnPage) {
          cardOnPage.classList.add('opacity');
        }
      }
    } else {
      data.forEach((element) => {
        const cardOnPage = new CardElement(element).renderCard();
        if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
      });
    }
    return cardsOnPage;
  }
}
