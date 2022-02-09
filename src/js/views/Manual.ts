import { AbstractView } from './AbstractView';
import { renderPage, createAside, Group } from '../../book/renderPage';
import { currentPage } from '../../book/paginationBook';
import { addModal, toggleTranslate } from '../../book/settings';
import { renderDifficultPage } from '../../book/difficultPage';

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
    const aside = createAside();
    app.appendChild(aside);
    addModal();
    toggleTranslate();
    renderDifficultPage();
    return renderPage(Group, currentPage);
  }
}
export default Manual;
