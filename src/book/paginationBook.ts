import { renderPage, Group } from '../book/renderPage';
import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';

export let currentPage = 0;
export const totalPages = 30;

export function workingButtons():void {
  const waitForButton = setInterval(() => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const numPages = async ():Promise<void> => {
      async function prevPage(): Promise<void> {
        if (currentPage > 1) {
          // eslint-disable-next-line no-plusplus
          currentPage--;
        }
      }
      async function nextPage() {
        if (currentPage < totalPages) { currentPage += 1; }
      }
      const checkButtonOpacity = (): void => {
        if (prevButton) {
          clearInterval(waitForButton);
          if (currentPage === 1) {
            prevButton.classList.add('opacity');
          } else { prevButton.classList.remove('opacity'); }
        }
        if (nextButton) {
          if (currentPage === totalPages) {
            nextButton.classList.add('opacity');
          } else {
            nextButton.classList.remove('opacity');
          }
        }
      };

      if (prevButton) {
        prevButton.addEventListener('click', () => {
          prevPage();
          checkButtonOpacity();
        });
      }
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          nextPage();
          checkButtonOpacity();
        });
      }
    };
    numPages();
  });
}

export async function changeLevel() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    //const Page = renderPage(Group, currentPage);
    const cardsOnPage = document.querySelector('.book-page');
    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('level')) {
        const id = +(e.target as HTMLElement).id.split('level')[1];
        if (cardsOnPage) cardsOnPage.innerHTML = '';
        const data = await getWords(id, currentPage);
        data.forEach((element) => {
          const cardOnPage = new CardElement(element).renderCard();
          if (cardsOnPage) cardsOnPage.appendChild(cardOnPage);
        });
        return cardsOnPage;
      }
      return cardsOnPage;
    }
  });
}
