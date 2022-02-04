import { AbstractView } from "./AbstractView";

export class Error extends AbstractView {
  constructor() {
    super();
    this.setTitle('Error - page does not exist');
  }


  async getHtml(): Promise<HTMLElement> {
    let htmlElement= document.createElement('div');
    htmlElement.innerHTML =  `<p>404 Page does not exist</a>`;
    return htmlElement;
  }
}