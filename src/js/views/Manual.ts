import { AbstractView } from './AbstractView';
import { renderPage, createAside, Group } from '../../book/renderPage';
import { workingButtons, currentPage, changeLevel } from '../../book/paginationBook';
import { addModal } from '../../book/settings';

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
    workingButtons();
    addModal();
    changeLevel();
    return renderPage(Group, currentPage);
  }
}
export default Manual;
