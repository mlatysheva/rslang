import { AbstractView } from './AbstractView';
import { Page } from '../../book/renderPage';

export class Manual extends AbstractView {
  constructor() {
    super();
    this.setTitle('Manual');
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');
    const footer = <HTMLElement>document.querySelector('.footer');
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    return Page;
  }
}

export default Manual;
