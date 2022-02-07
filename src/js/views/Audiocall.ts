import { AbstractView } from './AbstractView';
import { renderWord } from '../../card/renderOne';
import { renderGame1Round } from '../../game/roundRender';
import { renderGame } from '../../game/gameDescribe';

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
    /*function game1Wiev() {
      let gameDescribe = renderGame();

      return gameDescribe;
    }*/
    let unswer = renderWord('5e9f5ee35eb9e72bc21af4a4'); //пока цель получить 1 полную карточку по id
    let round = renderGame1Round('5e9f5ee35eb9e72bc21af4a4');
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
