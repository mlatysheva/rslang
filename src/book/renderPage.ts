import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';
import { settings } from '../book/svg';
import { currentPage, totalPages } from '../book/paginationBook';

export const Group = 0;

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
  const data = await getWords(group, page);
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

export function createAside() {
  const aside = document.createElement('aside');
  aside.classList.add('levels');
  aside.innerHTML = `
  <h2>Textbook</h2>
  <button class="settings">${settings}</button>
  <div id="level0" class="level level1">Chapter 1</div>
  <div id="level1" class="level level2">Chapter 2</div>
  <div id="level2" class="level level3">Chapter 3</div>
  <div id="level3" class="level level4">Chapter 4</div>
  <div id="level4" class="level level5">Chapter 5</div>
  <div id="level5" class="level level6">Chapter 6</div>
  <div id="level6" class="level level7">Difficult words</div>
  <div id="modal" class="modal">
    <div class = modal-content>
      <button class="close-button">&times;</button>
      <div class="switch">
      <div class="switch-item"></div>
      <label>
        <span class="show-translation">show translation</span>
        <input
          type="checkbox"
          id="translate"
          class="btn-switch green tinyswitch translate"
          checked />
        <div><div></div></div
      ></label>
    </div>
    <div class="switch">
      <div class="switch-item"></div>
      <label>
        <span class="show-buttons">show button for words</span>
        <input
          type="checkbox"
          id="difficult"
          class="btn-switch green tinyswitch translate"
          checked />
        <div><div></div></div
      ></label>
    </div>
      <button id="save" class="save">save</button>
    </div>
  </div>
 `;
  return aside;
}
