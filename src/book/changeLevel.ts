import { renderPage } from './renderPage';
import { currentPage } from './paginationBook';

export async function changeLevel() {
  const level = document.querySelectorAll('.level');

  level.forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('active-page');
      const id = element.id.split('level')[1];
      if (id === '3') {
        const Page = renderPage(3, currentPage);
			 }
    });
  });
}

export default changeLevel;
