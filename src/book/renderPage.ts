import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import {
  nextPage, prevPage, currentPage, totalPages,
} from '../book/paginationBook';

const Group = 0;
export const numPages = 30;
let index = 0;

export async function renderPage(group: number, page: number) : Promise<HTMLElement> {
  const Page = document.createElement('section');
  Page.classList.add('book');

  const prevButton = document.createElement('button');
  prevButton.setAttribute('id', 'prev');
  prevButton.innerText = 'prev';
  const nextButton = document.createElement('button');
  nextButton.setAttribute('id', 'next');
  nextButton.innerText = 'next';
  const counter = document.createElement('span');
  counter.classList.add('counter');
  const paginationBtn = document.createElement('div');
  paginationBtn.classList.add('pagination');

  Page.appendChild(paginationBtn);

  paginationBtn.appendChild(prevButton);
  paginationBtn.appendChild(counter);
  paginationBtn.appendChild(nextButton);

  const cardsOnPage = document.createElement('div');
  cardsOnPage.classList.add('book-page');
  Page.appendChild(cardsOnPage);

  const data = await getWords(Group, page);
  data.forEach((element) => {
    const cardOnPage = new CardElement(element).renderCard();
    if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
  });

  const slide = (offset: number) => {
    index = Math.min(Math.max(index + offset, 0), totalPages - 1);
    if (counter) {
      counter.innerHTML = `${index + 1} / ${totalPages}`;
      nextButton.setAttribute('data-state', index === 0 ? 'disabled' : '');
      prevButton.setAttribute('data-state', index === totalPages - 1 ? 'disabled' : '');
      nextButton.onclick = slide.bind(offset, 1);
      prevButton.onclick = slide.bind(offset, -1);
    }
    nextButton?.addEventListener('click', () => {
      nextPage();
    });
    prevButton?.addEventListener('click', () => {
      prevPage();
    });
  };
  slide(0);

  return Page;
}

export const Page = renderPage(Group, currentPage);
