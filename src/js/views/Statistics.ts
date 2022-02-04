import { AbstractView } from "./AbstractView";

export class Statistics extends AbstractView {
  constructor() {
    super();
    this.setTitle('Statistics');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }

    let htmlElement= document.createElement('div');
    htmlElement.innerHTML =  `
    <div class="view statistics-view">
      <p>Statistics of the user will be added<p>
    </div>
    `;
    return htmlElement;
  }
}