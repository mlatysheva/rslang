import { AbstractView } from "../js/views/AbstractView";

export class Sprint extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Sprint');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');
    
    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.add('hide');
    let htmlElement = document.createElement('div');
    htmlElement.classList.add('view', 'sprint-view');
    htmlElement.innerHTML =  `
    <div class="sprint-start-screen">
      <div class="sprint-title">
        <p class="title sprint-title">Спринт</p>
        <p class="sprint-text">Угадай как можно больше слов за 15 секунд</p>
        <p class="large-text">Игра помогает закрепить выученные слова</p>
      </div>
      <div class="level-wrapper">
        <p class="sprint-text">Выбери уровень:</p>
        <div class="level-range">
          <div class="sprint-level level-a1" id="group-0">1</div>
          <div class="sprint-level level-a2" id="group-1">2</div>
          <div class="sprint-level level-b1" id="group-2">3</div>
          <div class="sprint-level level-b2" id="group-3">4</div>
          <div class="sprint-level level-c1" id="group-4">5</div>
          <div class="sprint-level level-c2" id="group-5">6</div>
        </div>
      </div>

      <div class="todo">      
      <p>//TODO: управлять игрой можно как мышкой, так и клавишами на клавиатуре</p>
    </div>

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