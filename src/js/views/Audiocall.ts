import { AbstractView } from './AbstractView';
import { renderWord } from '../../card/renderOne';
import { renderGame1Round } from '../../game1/roundRender';
import { renderGame } from '../../game1/gameDescribe';

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
    let unswer = renderWord('5e9f5ee35eb9e72bc21af4a4'); //пока цель получить 1 полную карточку по id

    let gameDescribe = renderGame();
    return gameDescribe;
  }

  /*async renderCard() {
    return `
    <div class="card audiocall-card">
      <p>This is future card with audiocall words</p>
    </div>
    `
  }*/
}

//"id": "5e9f5ee35eb9e72bc21af4a4",
