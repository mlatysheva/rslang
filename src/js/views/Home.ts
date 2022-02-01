import { AbstractView } from "./AbstractView";

export class Home extends AbstractView {
  constructor() {
    super();
    this.setTitle('Learn English');
  }


  getHtml() {
    const app = <HTMLElement>document.querySelector('.app');

    // TODO: добавить апе классы или еще какие манипуляции

    const footer = <HTMLElement>document.querySelector('.footer');
    if(footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    return `
    <div class="view home-view">
      <p>This is the home page</p>
    </div>
    `;
  }
}