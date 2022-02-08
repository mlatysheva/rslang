import { AbstractView } from "./AbstractView";

export class Home extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Learn English');
  }


  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить апе классы или еще какие манипуляции

    const footer = <HTMLElement>document.querySelector('.footer');
    if(footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }
    let htmlElement= document.createElement('div');
    htmlElement.classList.add('view', 'home-view');
    htmlElement.innerHTML =  `    
      <p class="large-text bold-text">Решил наконец-то взяться за английский?</p>
      <p class="large-text">Наше приложение поможет тебе выучить в игровой форме наиболее распространенные 4000 слов английского языка</p>
    `;
    return htmlElement;
  }
}