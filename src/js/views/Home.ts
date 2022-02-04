import { AbstractView } from "./AbstractView";

export class Home extends AbstractView {
  constructor() {
    super();
    this.setTitle('Learn English');
  }


  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить апе классы или еще какие манипуляции

    const footer = <HTMLElement>document.querySelector('.footer');
    if(footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    let htmlElement= document.createElement('div');
    htmlElement.innerHTML =  `
    <div class="view home-view">
      <p>This is the home page</p>
    </div>
    `;
    return htmlElement;
  }
}