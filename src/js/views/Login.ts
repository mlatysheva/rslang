import { AbstractView } from "./AbstractView";

export class Login extends AbstractView {
  constructor() {
    super();
    this.setTitle('Login');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    footer.classList.remove('hide');

    let htmlElement= document.createElement('div');
    htmlElement.innerHTML = `
    <div class="view login-view">
      <p>Authentication of user will be added<p>
    </div>`;
    return htmlElement;
  }
}