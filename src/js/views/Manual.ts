import { AbstractView } from './AbstractView';
import { renderPage, createAside } from '../../book/renderPage';
import { workingButtons, Group, currentPage } from '../../book/paginationBook';
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

    function newFunction() {
      workingButtons();
    }
    const Page = renderPage(Group, currentPage);
    newFunction();
    addModal();
    return Page;
  }
}
export default Manual;
