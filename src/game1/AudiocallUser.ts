import { AbstractView } from '../js/views/AbstractView';
import { renderGameFromBook } from './game1FromBook';

export class AudiocallUser extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Audiocall');
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апп

    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    let gameDescribe = renderGameFromBook();
    return gameDescribe;
  }
}

//<a href="#/audiocall/" data-href="#/audiocall/" class="nav-link">АУДИОВЫЗОВ</a>
