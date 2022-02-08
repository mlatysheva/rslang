import { renderForRegisteredUser } from "../../statistics/renderStatisticsPage";
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
    const data = await getUserStatistics();
    htmlElement.innerHTML =  `
    <div class="view statistics-view">
      <div class="statistics-wrapper unregistered-statistics">
        <div class="large-text not-available">
          Статистика доступна только для зарегистрированных пользователей
        </div>
        <div class="large-text">
          Решил зарегистрироваться?
        </div>
        <a href="#/signup/" id="signup-btn" class="button statistic-button signup-btn" data-href="#/signup/">Жми сюда</a>
      </div>
    </div>
    `;
    await renderForRegisteredUser();
    return htmlElement;
  }
}