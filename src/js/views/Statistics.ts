import { getUserStatistics } from "../api";
import { AbstractView } from "./AbstractView";

export class Statistics extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Statistics');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    const footer = <HTMLElement>document.querySelector('.footer');    
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }

    let htmlElement= document.createElement('div');
    htmlElement.classList.add('view', 'statistics-view');
    let html = `
    <div class="title statistics-title">
      Посмотрим-с на твой прогресс...
    </div>
    `

    const data = await getUserStatistics();
    if (data) {

      console.log(`data is ${data.status}`);
      if (data.status == 200) {
        const content = await data.json();
        const totalWords = content.learnedWords;

        html += `
        
        <div class="statistics-wrapper registered-statistics">
          <div class="large-text learned-words">
            Ты выучил ${totalWords} слов.
          </div>
        </div>
        
      `;
      } else if (data.status === 401) {
        html += `
          <div class="statistics-wrapper registered-statistics">
            <div class="large-text">
              Истек срок действия токена. Войди в систему заново.
            </div>
            <a href="#/login/" id="login-btn" class="button statistic-button login-btn" data-href="#/login/">Жми сюда</a>
          </div>
        `
      } else if (data.status === 404) {
        html += `
          <div class="statistics-wrapper registered-statistics">
            <div class="large-text">
              Товарищ! Ты выучил хоть одно слово? А уже статистику теребишь!..
            </div>
            <a href="#/manual/" class="button statistic-button login-btn" data-href="#/manual/">Хочу штудировать Учебник</a>
            <a href="#/audiocall/" class="button statistic-button login-btn" data-href="#/audiocall/">Хочу играть</a>
          </div>
        `
      } else {    
        html +=  `
          <div class="statistics-wrapper unregistered-statistics">
            <div class="large-text not-available">
              Статистика доступна только для зарегистрированных пользователей
            </div>
            <div class="large-text">
              Решил зарегистрироваться?
            </div>
            <a href="#/signup/" id="signup-btn" class="button statistic-button signup-btn" data-href="#/signup/">Жми сюда</a>
          </div>
        `;    
      }
    }
    htmlElement.innerHTML = html;
    return htmlElement;
  }
}