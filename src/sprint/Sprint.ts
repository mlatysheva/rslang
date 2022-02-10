import { AbstractView } from "../js/views/AbstractView";

export class Sprint extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Sprint');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апп
    
    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    let htmlElement = document.createElement('div');
    htmlElement.classList.add('view', 'sprint-view');
    htmlElement.innerHTML =  `
    <div class="sprint-start-screen">
      <div class="sprint-title">
        <p class="title sprint-title">Спринт</p>
        <p class="large-text">Угадай 20 слов за 60 секунд.</p>
        <p class="large-text">Игра помогает закрепить выученные слова.</p>
      </div>
      <div class="level-wrapper">
        <p class="large-text">Выбери уровень:</p>
        <div class="level-range">
          <div class="sprint-level level-a1" id="group-0">A1</div>
          <div class="sprint-level level-a2" id="group-1">A2</div>
          <div class="sprint-level level-b1" id="group-2">B1</div>
          <div class="sprint-level level-b2" id="group-3">B2</div>
          <div class="sprint-level level-c1" id="group-4">C1</div>
          <div class="sprint-level level-c2" id="group-5">C2</div>
        </div>
      </div>
    </div>

    <div class="todo">
      <p>//TODO: по окончанию каждой игры выводятся результаты мини-игры</p>
      <p>//TODO: управлять игрой можно как мышкой, так и клавишами на клавиатуре</p>
      <p>//TODO: если мини-игра запускается из меню, в ней можно выбрать один из шести уровней сложности</p>
      <p>//TODO: если мини-игра запускается со страницы учебника, в ней используются слова из соответствующей страницы учебника</p>
    </div>
    `;
    return htmlElement;
  }

  async renderCard() {
    return `
    <div class="card sprint-card">
      <p>This is future card with words for sprint game</p>
    </div>
    `
  }
}