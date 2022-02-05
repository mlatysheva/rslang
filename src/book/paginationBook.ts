import { renderPage } from '../book/renderPage';

export let currentPage = 0;
export const Group = 0;
export const totalPages = 30;

export function workingButtons() {
  const waitForButton = setInterval(() => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const numPages = async ():Promise<void> => {
      async function prevPage(): Promise<void> {
        if (currentPage > 1) {
          // eslint-disable-next-line no-plusplus
          currentPage--;
          renderPage(Group, currentPage);
        }
      }
      async function nextPage() {
        if (currentPage < totalPages) { currentPage += 1; }
        renderPage(Group, currentPage);
      }
      const checkButtonOpacity = function (): void {
        if (prevButton) {
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
