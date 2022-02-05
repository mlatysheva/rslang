import { AbstractView } from './AbstractView';
import { renderPage } from '../../book/renderPage';
import { workingButtons, Group, currentPage } from '../../book/paginationBook';

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
    workingButtons();
    const Page = renderPage(Group, currentPage);
    return Page;
  }
}

export default Manual;
