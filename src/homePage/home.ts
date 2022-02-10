import { AbstractView } from "../js/views/AbstractView";

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
      <div class="home-hero">  
      </div>
      <div class="mission-wrapper">
        <p class="home-mission-text bold-text">Решил наконец-то взяться за английский?</p>
        <p class="home-text-large">Наше приложение поможет тебе выучить в игровой форме наиболее <br>распространенные 4000 слов английского языка</p>
      </div>
      <div class="todo">//TODO: описание возможностей и преимуществ приложения
      </div>
      <div class="todo">//TODO: раздел "О команде" с фото или аватарками и ссылками на гитхабы всех участников команды, описанием вклада в разработку приложения каждого из них.
      </div>
    `;
    return htmlElement;
  }
}