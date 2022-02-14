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
        <p class="home-text-large slogan-text">Наше приложение <span class="home-bold">MGIMO FINISHED</span> поможет тебе выучить в игровой форме наиболее <br>распространенные 4000 слов английского языка</p>
      </div>
      <div class="advantages-wrapper">
        <div class="home-mission-text advantages-text">
          Преимущества приложения MGIMO FINISHED
        </div>
        <div class="advantages-title home-text-large">
          Вот какие преимущества ты получишь благодаря приложению <span class="home-bold">MGIMO FINISHED</span>, <br>если будешь регулярно и ответственно заниматься
        </div>
        <div class="advantage-cards-container">
          <div class="advantage-card-wrapper">
            <div class="advantage-icon mandalorian-icon">
            </div>
            <div class="advantage-title">
                Регистрируйся и получай внимательное отношение
            </div>
            <div class="advantage-text home-text">
              
              <p>Больше всего преимуществ получают зарегистрированные пользователи, включая возможности управлять настройками учебника и отслеживать свой прогресс.</p>
              <p>Так что не раздумывай и </p>
              <a href="#/signup/" id="signup-btn" class="button statistic-button signup-btn" data-href="#/signup/">Жми сюда</a>
            </div>          
          </div>

          <div class="advantage-card-wrapper">
            <div class="advantage-icon manual-icon">
            </div>
            <div class="advantage-title">
                Учебник из 3600 слов
            </div>
            <div class="advantage-text home-text">              
              <p>Учебник содержит самые распространенные английские слова</p>
              <p>Слова разделены на 6 уровней сложности </p>
              <p>Зарегистрированные пользователи могут отметить слова как сложные и учить их на отдельной странице </p>
              <p>Слово можно отметить как изученное и гордиться успехами на странице <a href="#/statistics/" class="advantage-link" data-href="#/statistics/">Статистика</a></p>
            </div>          
          </div>

          <div class="advantage-card-wrapper">
            <div class="advantage-icon schwein-icon">
            </div>
            <div class="advantage-title">
                Учись бесплатно!
            </div>
            <div class="advantage-text home-text">              
              <p>Мы разрабатывали это приложение, фактически не спав по ночам</p>
              <p>Но тебе его отдаем бесплатно </p>
              <p>Мы хотим, чтобы наши люди были более культурными </p>
              <p>В обмен просим тебя регулярно заниматься английским</p>
            </div>          
          </div>

          <div class="advantage-card-wrapper">
            <div class="advantage-icon game-icon">
            </div>
            <div class="advantage-title">
                Учись в игровой форме
            </div>
            <div class="advantage-text home-text">  
              <p>Мы включили две игры, чтобы тебе было веселее заниматься</p>            
              <p>Игра Аудиовызов поможет тебе запомнить слова на слух</p>
              <p>Игра Спринт поможет закрепить слова </p>
              <p>Выходи из зоны комфорта с комфортом! </p>
            </div>          
          </div>

        </div>
      </div>
      <div class="todo">//TODO: раздел "О команде" с фото или аватарками и ссылками на гитхабы всех участников команды, описанием вклада в разработку приложения каждого из них.
      </div>
    `;
    return htmlElement;
  }
}
