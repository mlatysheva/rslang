import { AbstractView } from './AbstractView';
import { renderPage } from "../../book/renderPage";

const page = 2;
const group = 2;

export class Manual extends AbstractView {
  constructor() {
    super();
    this.setTitle('Manual');
  }

  async getHtml(): Promise<HTMLElement> {
    //const app = <HTMLElement>document.getElementById('app');
    const footer = <HTMLElement>document.querySelector('.footer');
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
      const Page = await renderPage(group, page);
      return Page;
  }
     
 }

