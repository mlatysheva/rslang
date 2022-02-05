import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { settings } from '../book/svg';
import { currentPage, totalPages, Group } from '../book/paginationBook';

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
  };
  slide(0);
  return Page;
}

export const Page = renderPage(Group, currentPage);

export function createAside() {
  const aside = document.createElement('aside');
  aside.classList.add('levels');
  aside.innerHTML = `
  <h2>Textbook</h2>
  <button class="settings">${settings}</button>
  <div class="level level1">Chapter 1</div>
  <div class="level level2">Chapter 2</div>
  <div class="level level3">Chapter 3</div>
  <div class="level level4">Chapter 4</div>
  <div class="level level5">Chapter 5</div>
  <div class="level level6">Chapter 6</div>
  <div id="modal" class="modal">
    <div class = modal-content>
      <button class="close-button">&times;</button>
      <p class="show-buttons">show button for words</p>
      <p class="show-translation">show translation</p>
      <button class="save">save</button>
    </div>
  </div>
 `;
  return aside;
}
