import { getUserStatistics, getUserWordsAll } from '../js/api';
import { AbstractView } from '../js/views/AbstractView';
import { sprintNewWords } from './globalStorage';
import { getItemFromLocalStorage } from '../js/localStorage';
import { numberDayLearnedWords, percentLearnedWords } from '../book/learnedWords';
import { sprintIcon, callIcon } from '../book/svg';
import {
  getLastDay,
  getLongestTrueQuestionsPerDay,
  getQuestionsPerDay,
  getTrueQuestionsPerDay,
  resetLastDay,
  setCurrentLongestTrueQuestionsPerDay,
  setLongestTrueQuestionsPerDay,
  setQuestionsPerDay,
  setTrueQuestionsPerDay,
} from '../game1/localStorageHelper';

export class Statistics extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Statistics');
  }

  async getHtml(): Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    const footer = <HTMLElement>document.querySelector('.footer');
    if (footer.classList.contains('hide')) {
      footer.classList.remove('hide');
    }

    const htmlElement = document.createElement('div');
    htmlElement.classList.add('view', 'statistics-view');
    let html = `
    <div class="title statistics-title">
      Посмотрим-ка на твой прогресс...
    </div>

    `;

    const data = await getUserStatistics();
    if (data) {
      console.log(`status is ${data.status}`);
      if (data.status === 200) {
        const content = await data.json();
        const totalLearnedWords = content.learnedWords;

        const userWords = await getUserWordsAll(getItemFromLocalStorage('id'));
        let sprintNewWords = 0;
        let sprintCorrectlyAnswered = 0;
        let sprintTotalAnswers = 0;
        
        userWords.forEach((userWord) => {
          if (userWord.optional?.sprintNewWord) {
            sprintNewWords++;
          };
          if (userWord.optional?.sprintCorrectlyAnswered) {
            sprintCorrectlyAnswered += userWord.optional?.sprintCorrectlyAnswered;
          }
          if (userWord.optional?.sprintTotalAnswers) {
            sprintTotalAnswers += userWord.optional?.sprintTotalAnswers;
          }
        })

        let sprintCorrectlyAnsweredPercent = ((sprintCorrectlyAnswered / sprintTotalAnswers ) * 100 ).toFixed();


        let today = new Date().toLocaleDateString();

        if (getLastDay() !== new Date().toISOString().split('T')[0]) {
          setQuestionsPerDay(0);
          setTrueQuestionsPerDay(0);
          setLongestTrueQuestionsPerDay(0);
          setCurrentLongestTrueQuestionsPerDay(0);
          resetLastDay();
        }

        let unswersCorrect = getTrueQuestionsPerDay();
        let questions = getQuestionsPerDay();
        let newWordsPerDay = Math.ceil(Math.random() * 20); //TODO: не так должно быть

        let precentCorrectAnswersPerDay = Math.ceil((unswersCorrect / questions) * 100);
        let longestTrueUnswersPerDay = getLongestTrueQuestionsPerDay();
        const arrAudiocall = [
          { newWords: `${newWordsPerDay}` },
          { precentCorrectAnswers: `${precentCorrectAnswersPerDay}` },
          { longestTrueUnswers: `${longestTrueUnswersPerDay}` },
        ];

        html += `
        
        <div class="statistics-wrapper registered-statistics">
        <div class="statistics-mission-text statistics-text">
          Твоя статистика обучения в <span class="statistics-bold">MGIMO FINISHED</span> за <span class="statistics-bold">${today}</span>:
        </div>
        <div class="statistics-cards-container">
          <div class="statistics-card-wrapper">
            <div class="statistics-icon">${callIcon}
            </div>
            <div class="statistics-title">
                Аудиовызов
            </div>
            <div class="statistics-text home-text">
              
              <p>Новых слов: <span class="statistics-indicator audiocall-new-words">${
                arrAudiocall[0]['newWords']
              }</span></p>
              <p>Правильных ответов: <span class="statistics-indicator audiocall-correct-answers">${
                arrAudiocall[1]['precentCorrectAnswers']
              } %</span> </p>
              <p>Самая длинная серия правильных ответов: <span class="statistics-indicator audiocall-longest-series">${
                arrAudiocall[2]['longestTrueUnswers']
              }</span></p>
            </div>          
          </div>  
          
          <div class="statistics-card-wrapper">
            <div class="statistics-icon sprint-statistics-icon">
            </div>
            <div class="statistics-title">
                Спринт
            </div>
            <div class="statistics-text home-text">
              
              <p>Новых слов: <span class="statistics-indicator sprint-new-words">${sprintNewWords}</span></p>
              <p>Правильных ответов: <span class="statistics-indicator sprint-correct-answers">${sprintCorrectlyAnsweredPercent} %</span> </p>
              <p>Самая длинная серия правильных ответов: <span class="statistics-indicator sprint-longest-series">0</span></p>
            </div>          
          </div>
  
          <div class="statistics-card-wrapper">
            <div class="statistics-icon manual-icon">
            </div>
            <div class="statistics-title">
                Учебник
            </div>
            <div class="statistics-text home-text">            
              <p>Новых слов: <span class="statistics-indicator book-new-words">0</span></p>
              <p>Изученных слов: <span class="statistics-indicator book-learned-words">${numberDayLearnedWords()}</span> </p>
              <p>% от общего количества слов: <span class="statistics-indicator book-correct-answers">${percentLearnedWords()}</span></p>
            </div>          
          </div>
  
        </div>

        <div class="todo">
          <p>//TODO: отображается краткосрочная статистика по мини-играм и по словам за каждый день изучения</p>
          <p>//TODO: в статистике по мини-играм указываются результаты по каждой мини-игре отдельно</p>
              <ul>
                <li>количество новых слов за день</li>
                <li>процент правильных ответов</li>
                <li>самая длинная серия правильных ответов</li>
              </ul>

          <p>//TODO: в краткосрочной статистике по словам указываются</p>
            <ul>
              <li>количество новых слов за день</li>
              <li>количество изученных слов за день</li>
              <li>процент правильных ответов за день</li>
            </ul>
        </div>
        
      `;
      } else if (data.status === 401) {
        html += `
          <div class="statistics-wrapper registered-statistics">
            <div class="large-text">
              Статистика доступна только для зарегистрированных пользователей.
            </div>
            <a href="#/signup/" id="login-btn" class="button statistic-button login-btn" data-href="#/signup/">Жми сюда</a>
          </div>
        `;
      } else if (data.status === 404) {
        html += `
          <div class="statistics-wrapper registered-statistics">
            <div class="large-text">
              Товарищ! Ты выучил хоть одно слово? А уже статистику теребишь!..
            </div>
            <a href="#/manual/" class="button statistic-button go-to-manual-button login-btn" data-href="#/manual/">Хочу штудировать Учебник</a>
            <a href="#/audiocall/" class="button statistic-button login-btn" data-href="#/audiocall/">Хочу играть</a>
          </div>
        `;
      } else {
        html += `
          <div class="statistics-wrapper unregistered-statistics">
            <div class="large-text not-available">
              Истек срок действия токена.
            </div>
            <div class="large-text">
              Войди в систему заново.
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
export default Statistics;

/*<div class="statistics-icon audiocall-icon">
</div>*/
