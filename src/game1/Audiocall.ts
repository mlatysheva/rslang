import { AbstractView } from '../js/views/AbstractView';
import { renderGame } from './gameDescribe';
import { renderGameFromBook } from './game1FromBook';
export class Audiocall extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Audiocall');
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апп

    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    //let gameDescribe = renderGame();
    let gameDescribe = renderGameFromBook();
    return gameDescribe;
  }
}
