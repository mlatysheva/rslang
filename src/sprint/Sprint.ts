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
        <div class="sprint-icon-initial-screen">
          <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
            <circle fill="#FF9800" cx="28" cy="9" r="5"></circle>
            <path fill="#00796B" d="M29,27.3l-9.2-4.1c-1-0.5-1.5,1-2,2c-0.5,1-4.1,7.2-3.8,8.3c0.3,0.9,1.1,1.4,1.9,1.4c0.2,0,0.4,0,0.6-0.1 L28.8,31c0.8-0.2,1.4-1,1.4-1.8C30.2,28.4,29.7,27.6,29,27.3z"></path>
            <path fill="#009688" d="M26.8,15.2l-2.2-1c-1.3-0.6-2.9,0-3.5,1.3L9.2,41.1c-0.5,1,0,2.2,1,2.7c0.3,0.1,0.6,0.2,0.9,0.2 c0.8,0,1.5-0.4,1.8-1.1c0,0,9.6-13.3,10.4-14.9s4.9-9.3,4.9-9.3C28.7,17.4,28.2,15.8,26.8,15.2z"></path>
            <path fill="#FF9800" d="M40.5,15.7c-0.7-0.8-2-1-2.8-0.3l-5,4.2l-6.4-3.5c-1.1-0.6-2.6-0.4-3.3,0.9c-0.8,1.3-0.4,2.9,0.8,3.4 l8.3,3.4c0.3,0.1,0.6,0.2,0.9,0.2c0.5,0,0.9-0.2,1.3-0.5l6-5C41.1,17.8,41.2,16.6,40.5,15.7z"></path>
            <path fill="#FF9800" d="M11.7,23.1l3.4-5.1l4.6,0.6l1.5-3.1c0.4-0.9,1.2-1.4,2.1-1.5c-0.1,0-0.2,0-0.2,0h-9c-0.7,0-1.3,0.3-1.7,0.9 l-4,6c-0.6,0.9-0.4,2.2,0.6,2.8C9.2,23.9,9.6,24,10,24C10.6,24,11.3,23.7,11.7,23.1z"></path>
          </svg>
        </div>
        <p class="title sprint-title">Спринт</p>
        <p class="sprint-text">Угадай как можно больше слов за 15 секунд</p>
        <p class="large-text">Игра помогает закрепить выученные слова</p>
      </div>
      <div class="level-wrapper">
        <p class="sprint-text">Выбери уровень:</p>
        <div class="sprint-level-range">
          <div class="sprint-level" id="group-0">1</div>
          <div class="sprint-level" id="group-1">2</div>
          <div class="sprint-level" id="group-2">3</div>
          <div class="sprint-level" id="group-3">4</div>
          <div class="sprint-level" id="group-4">5</div>
          <div class="sprint-level" id="group-5">6</div>
        </div>
      </div>

      <div class="text-box">      
        <p>Выбери уровень мышкой или с клавиатуры (<span class="bold-text">Клавиши 1 .. 6</span>)</p>
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