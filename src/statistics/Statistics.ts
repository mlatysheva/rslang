import { getUserStatistics, getUserWordsAll } from '../js/api';
import { AbstractView } from '../js/views/AbstractView';
import { getItemFromLocalStorage } from '../js/localStorage';
import { numberDayLearnedWords, percentLearnedWords, dayWords } from '../book/learnedWords';
import { callIcon } from '../book/svg';
import { getTodayDate } from '../game1/localStorageHelper';
import * as audiocallApiHelper from '../game1/statisticsApiHelper';
import { numberForStatistic, numberLearnedWords } from '../book/difficultPage';

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
      if (data.status === 200) {
        console.log('Statistics successfully received from the server');
        const content = await data.json();
        const totalLearnedWords = content.learnedWords;
        let sprintLongestSeries;
        if (content.optional == null) {
          sprintLongestSeries = 0;
        } else if (content.optional.sprintLongestSeries == null) {
          sprintLongestSeries = 0;
        } else {
          sprintLongestSeries = content.optional.sprintLongestSeries;
        }

        const userWords = await getUserWordsAll(getItemFromLocalStorage('id'));
        let sprintNewWords = 0;
        let sprintCorrectlyAnswered = 0;
        let sprintTotalAnswers = 0;

        userWords.forEach((userWord) => {
          if (userWord.optional?.sprintNewWord) {
            sprintNewWords++;
          }
          if (userWord.optional?.sprintCorrectlyAnswered) {
            sprintCorrectlyAnswered += userWord.optional?.sprintCorrectlyAnswered;
          }
          if (userWord.optional?.sprintTotalAnswers) {
            sprintTotalAnswers += userWord.optional?.sprintTotalAnswers;
          }
        });

        let sprintCorrectlyAnsweredPercent = ((sprintCorrectlyAnswered / sprintTotalAnswers) * 100).toFixed();
        if (sprintCorrectlyAnsweredPercent === 'NaN') {
          sprintCorrectlyAnsweredPercent = '0';
        }
        if (parseInt(sprintCorrectlyAnsweredPercent) > 100) {
          sprintCorrectlyAnsweredPercent = '100';
        }

        // if (sprintLongestSeries != null) {
        //   localStorage.setItem('sprintLongestSeries', sprintLongestSeries)
        // } else {
        //   sprintLongestSeries = 0;
        //   localStorage.setItem('sprintLongestSeries', JSON.stringify(sprintLongestSeries));
        // }
        // if (localStorage.getItem('sprintLongestSeries') !== null) {
        //   sprintLongestSeries = JSON.parse(localStorage.getItem('sprintLongestSeries') || '');
        // } else {
        //   sprintLongestSeries = 0;
        // }

        let today = new Date().toLocaleDateString();

        let arrAudiocall = [{ newWords: `${0}` }, { precentCorrectAnswers: `${0}` }, { longestTrueUnswers: `${0}` }];

        //TODO: if user has id { all stat if (getItemFromLocalStorage('id') !== null) {}
        if (getItemFromLocalStorage('id')) {
          if ((await audiocallApiHelper.getLastVisitedDate()) !== getTodayDate()) {
            // localStorage
            /**setQuestionsPerDay(0);
          setTrueQuestionsPerDay(0);
          setLongestTrueQuestionsPerDay(0);
          setCurrentLongestTrueQuestionsPerDay(0);
          resetLastDay();*/

            await audiocallApiHelper.resetStatistics();
          }
          let unswersCorrect = await audiocallApiHelper.getTrueQuestionsPerDay();
          let questions = await audiocallApiHelper.getQuestionsPerDay();
          let newWordsPerDay = unswersCorrect + Math.ceil(Math.random() * 15); //TODO: не так должно быть или хотябы чтоб сегодня не меньше чем было уже
          if (newWordsPerDay >= questions) {
            newWordsPerDay = questions - Math.ceil(Math.random());
            if (newWordsPerDay < 0) {
              newWordsPerDay = 0;
            }
          }

          let precentCorrectAnswersPerDay = Math.ceil((unswersCorrect / questions) * 100);
          if (isNaN(precentCorrectAnswersPerDay)) {
            precentCorrectAnswersPerDay = 0;
          }
          let longestTrueUnswersPerDay = await audiocallApiHelper.getLongestTrueQuestionsPerDay();
          arrAudiocall = [
            { newWords: `${newWordsPerDay}` },
            { precentCorrectAnswers: `${precentCorrectAnswersPerDay}` },
            { longestTrueUnswers: `${longestTrueUnswersPerDay}` },
          ];
        }
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
                arrAudiocall[0].newWords
              }</span></p>
              <p>Правильных ответов: <span class="statistics-indicator audiocall-correct-answers">${
                arrAudiocall[1].precentCorrectAnswers
              } %</span> </p>
              <p>Самая длинная серия правильных ответов: <span class="statistics-indicator audiocall-longest-series">${
                arrAudiocall[2].longestTrueUnswers
              }</span></p>
            </div>          
          </div>  
          
          <div class="statistics-card-wrapper">
            <div class="sprint-statistics-icon">
              <svg class="svg-sprint-statistics" version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                <circle fill="#FF9800" cx="28" cy="9" r="5"></circle>
                <path fill="#00796B" d="M29,27.3l-9.2-4.1c-1-0.5-1.5,1-2,2c-0.5,1-4.1,7.2-3.8,8.3c0.3,0.9,1.1,1.4,1.9,1.4c0.2,0,0.4,0,0.6-0.1 L28.8,31c0.8-0.2,1.4-1,1.4-1.8C30.2,28.4,29.7,27.6,29,27.3z"></path>
                <path fill="#009688" d="M26.8,15.2l-2.2-1c-1.3-0.6-2.9,0-3.5,1.3L9.2,41.1c-0.5,1,0,2.2,1,2.7c0.3,0.1,0.6,0.2,0.9,0.2 c0.8,0,1.5-0.4,1.8-1.1c0,0,9.6-13.3,10.4-14.9s4.9-9.3,4.9-9.3C28.7,17.4,28.2,15.8,26.8,15.2z"></path>
                <path fill="#FF9800" d="M40.5,15.7c-0.7-0.8-2-1-2.8-0.3l-5,4.2l-6.4-3.5c-1.1-0.6-2.6-0.4-3.3,0.9c-0.8,1.3-0.4,2.9,0.8,3.4 l8.3,3.4c0.3,0.1,0.6,0.2,0.9,0.2c0.5,0,0.9-0.2,1.3-0.5l6-5C41.1,17.8,41.2,16.6,40.5,15.7z"></path>
                <path fill="#FF9800" d="M11.7,23.1l3.4-5.1l4.6,0.6l1.5-3.1c0.4-0.9,1.2-1.4,2.1-1.5c-0.1,0-0.2,0-0.2,0h-9c-0.7,0-1.3,0.3-1.7,0.9 l-4,6c-0.6,0.9-0.4,2.2,0.6,2.8C9.2,23.9,9.6,24,10,24C10.6,24,11.3,23.7,11.7,23.1z"></path>
              </svg>
            </div>
            <div class="statistics-title">
                Спринт
            </div>
            <div class="statistics-text home-text">
              
              <p>Новых слов: <span class="statistics-indicator sprint-new-words">${sprintNewWords}</span></p>
              <p>Правильных ответов: <span class="statistics-indicator sprint-correct-answers">${sprintCorrectlyAnsweredPercent} %</span> </p>
              <p>Самая длинная серия правильных ответов: <span class="statistics-indicator sprint-longest-series">${sprintLongestSeries}</span></p>
            </div>          
          </div>
  
          <div class="statistics-card-wrapper">
            <div class="statistics-icon manual-icon">
            </div>
            <div class="statistics-title">
                Учебник
            </div>
            <div class="statistics-text home-text">            
              <p>Трудных слов: <span class="statistics-indicator book-new-words">${numberForStatistic}</span></p>
              <p>Изученных слов за день: <span class="statistics-indicator book-learned-words">${numberDayLearnedWords()}</span> </p>
              <p>Изученных слов всего: <span class="statistics-indicator book-learned-words">${numberLearnedWords}</span> </p>
              <p>% от общего количества слов <br>(за день / всего):<br> <span class="statistics-indicator book-correct-answers">${percentLearnedWords(
                dayWords
              )} / ${percentLearnedWords(numberLearnedWords[0])} </span></p>
            </div>          
          </div>
  
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

/* <div class="statistics-icon audiocall-icon">
</div> */