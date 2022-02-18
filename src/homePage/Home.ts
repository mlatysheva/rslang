import { AbstractView } from "../js/views/AbstractView";

export class Home extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Learn English');
  }


  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

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
      <div class="about-wrapper">
        <div class="home-mission-text about-text">
          О команде
        </div>
        <div class="about-title home-text-large">
          Приложение <span class="home-bold">MGIMO FINISHED</span> разработали для тебя мы - <br>дружная команда из трех девчонок - 
          <br>студенток замечательного курса <span class="home-bold">Front-End/JS</span> от школы <span class="home-bold">Rolling Slopes School</span>.
        </div>
        <div class="about-cards-container">

          <div class="about-card-wrapper">
            <div class="about-photo maria-photo">
            </div>
            <div class="about-title">
              <span class="home-bold">Мария Латышева</span> <br>Team Lead
            </div>
            <div class="about-text home-text">              
              <p>Развернула сервер, разработала авторизацию пользователей и роутер. 
                <br>Сверстала главную страницу и страницу статистики.
                <br>Разработала игру Спринт.
                <br>Участвовала в разработке Статистики.
              </p>
            </div>          
          </div>

          <div class="about-card-wrapper">
            <div class="about-photo julia-photo">
            </div>
            <div class="about-title">
              <span class="home-bold">Юлия Миронова</span> <br>Разработчик
            </div>
            <div class="about-text home-text">              
              <p>Разработала игру Аудиовызов. 
                <br>Доработала роутер.
                <br>Участвовала в разработке Статистики.
              </p>
            </div>          
          </div>

          <div class="about-card-wrapper">
            <div class="about-photo lena-photo">
            </div>
            <div class="about-title">
              <span class="home-bold">Елена Гончарук</span> <br>Разработчик
            </div>
            <div class="about-text home-text">              
              <p>Разработала Учебник и список слов. 
                <br>Придумала основной дизайн.
                <br>Участвовала в разработке Статистики.
              </p>
            </div>          
          </div>

          

        </div>
      </div>
    `;
    return htmlElement;
  }
}
