import { AbstractView } from "./AbstractView";

export class Audiocall extends AbstractView {
  constructor() {
    super();
    this.setTitle('Audiocall');
  }

  getHtml() {
    const app = <HTMLElement>document.querySelector('.app');

    // TODO: добавить манипуляции с апп
    
    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    return `
    <div class="view audiocall-view">
      <p>This is audiocall game<p>
    </div>
    `;
  }

  async renderCard() {
    return `
    <div class="card audiocall-card">
      <p>This is future card with audiocall words</p>
    </div>
    `
  }
}