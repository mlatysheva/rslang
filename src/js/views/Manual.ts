import { AbstractView } from './AbstractView';
import { renderPage, createAside, Group, switchLevel} from '../../book/renderPage';
import { workingButtons, currentPage } from '../../book/paginationBook';
import { addModal } from '../../book/settings';
//import changeLevel from '../../book/changeLevel';

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
    return renderPage(Group, currentPage);
  }
}
export default Manual;
