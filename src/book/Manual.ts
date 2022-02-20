import { AbstractView } from '../js/views/AbstractView';
import { renderPage, createAside, Group } from './renderPage';
import { currentPage } from './paginationBook';
import { addModal, toggleTranslate, toggleButtons } from './settings';
import { renderDifficultPage } from './difficultPage';
import { renderGameFromBook } from '../game1/game1FromBook';

export class Manual extends AbstractView {
  constructor() {
    super();
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');
    const footer = <HTMLElement>document.querySelector('.footer');
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }

    addModal();
    toggleTranslate();
    toggleButtons();
    renderDifficultPage();

    return renderPage(Group, currentPage);
  }
}
export default Manual;

/*function bookOrGame1() {
      if (game1) {
        app.innerText = '';
        return renderGameFromBook();
      }
      return renderPage(Group, currentPage);
    }

    const game1 = document.getElementById('call');
    game1?.addEventListener('click', bookOrGame1);

    return bookOrGame1();*/
