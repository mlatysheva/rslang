import { Word } from '../js/types';
import { linkForCard, arrGroup, NUMBER_OF_ANSWERS_PER_QUESTION } from '../js/constants';
import { renderWord } from '../card/renderOne';
import { getPlayedQuestions } from './localStorageHelper';
import { Question1 } from './data/Question1';
export class QuestionRenderer {
  data: Word;
  question: Question1;

  constructor(cardDataObject: Question1) {
    this.data = cardDataObject.word;
    this.question = cardDataObject;
    /*this.dataUnswersArray = dataUnswersArray.map((d) => {
      d.answersArray = this.getAnswers(d.word, this.uniqueArtistsArr);
      d.isAnswered = false;
      d.isAnsweredCorrectly = false;
      return d;
    });
    this.currentQuestionInRound = 0;*/
  }

  getAudioId(): string {
    return `game1-${this.data.id}`;
  }

  render(): any {
    //TODO: normal type
    const soundEnableFunction = sound(this);
    let questionSection = document.createElement('div');
    if (this.data.group === arrGroup[0]) {
      questionSection.classList.add('card0');
    }
    if (this.data.group === arrGroup[1]) {
      questionSection.classList.add('card1');
    }
    if (this.data.group === arrGroup[2]) {
      questionSection.classList.add('card2');
    }
    if (this.data.group === arrGroup[3]) {
      questionSection.classList.add('card3');
    }
    if (this.data.group === arrGroup[4]) {
      questionSection.classList.add('card4');
    }
    if (this.data.group === arrGroup[5]) {
      questionSection.classList.add('card5');
    }
    questionSection.classList.add('round-game1');
    let questionTitle = document.createElement('h2');
    questionTitle.classList.add('round');
    questionTitle.textContent = 'Слушай и жми на правильный перевод:';
    let audio = document.createElement('button');
    audio.classList.add('play');
    audio.classList.add('player-icon');
    audio.classList.add('game1-sound');
    audio.setAttribute('id', this.getAudioId());
    audio.addEventListener('click', soundEnableFunction);
    questionSection.appendChild(questionTitle);
    questionSection.appendChild(audio);

    const unswers = document.createElement('div');
    unswers.classList.add('unswers-game1');

    unswers.innerHTML = `
    <button id=unswer0-${this.data.id} class="unswer-btn">${this.question.answersArray[0]}</button>
    <button id=unswer1-${this.data.id} class="unswer-btn">${this.question.answersArray[1]}</button>
    <button id=unswer2-${this.data.id} class="unswer-btn">${this.question.answersArray[2]}</button>
    <button id=unswer3-${this.data.id} class="unswer-btn">${this.question.answersArray[3]}</button>
    `;
    questionSection.appendChild(unswers);

    const nextQuestionButton = document.createElement('button');
    nextQuestionButton.classList.add('next-round');
    nextQuestionButton.classList.add('unswer-btn');
    nextQuestionButton.innerText = 'Пропустить -->';
    questionSection.appendChild(nextQuestionButton);

    function nextQuestion(e: Event) {
      // записать ответ в localStorage playedQuestions
      // isAnswered = true
      // isAnsweredCorrectly = false

      questionSection.innerHTML = '';
      if (getPlayedQuestions().length >= 10) {
        // выведи статистику
      } else {
        // генерь новый вопрос
      }
    }

    nextQuestionButton.addEventListener('click', nextQuestion);

    const buttons = Array.from(questionSection.getElementsByClassName('unswer-btn'));
    buttons.forEach((e: Element) => {
      e.addEventListener('click', nextQuestion);
    });

    return questionSection;
  }
}

function sound(round: QuestionRenderer): (e: MouseEvent) => void {
  return function (e: MouseEvent) {
    const changeSoundBtn = document.getElementById(round.getAudioId()) as HTMLElement;
    const audio = new Audio();
    const audioSrc = `${linkForCard}${round.data.audio}`;

    function getValue() {
      return audioSrc;
    }

    function playAudio() {
      audio.src = `${audioSrc}`;
      audio.currentTime = 0;
      audio.play();
    }

    function pauseAudio() {
      audio.pause();
    }

    function changePlayBtn() {
      changeSoundBtn.classList.toggle('pause');
      changeSoundBtn.classList.toggle('play');
      if (changeSoundBtn.classList.contains('play')) {
        pauseAudio();
      } else {
        getValue();
        playAudio();
      }
    }
    changePlayBtn();
  };
}

/*nextQuestion(){
      if(this.currentQuestionInRound<this.artistQuestionArray.length-1){
        this.currentQuestionInRound++;
        } else{
          this.currentQuestionInRound=0;
        }
    }

    getCurrentQuestion() {
      return this.artistQuestionArray[this.currentQuestionInRound];
    }

    getCorrectAnswersCount() {
      return this.artistQuestionArray.filter(q=>q.isAnsweredCorrectly).length;
    }

    getAnsweredCount() {
      return this.artistQuestionArray.filter(q=>q.isAnswered).length;
    }

    setAnswered(isAnsweredCorrectly) {
      this.getCurrentQuestion().isAnswered = true;
      this.getCurrentQuestion().isAnsweredCorrectly = isAnsweredCorrectly;
    }

    previousQuestion(){
      if(this.currentQuestionInRound>0){
      this.currentQuestionInRound--;
      } else{
        this.currentQuestionInRound=this.artistQuestionArray.length-1;
      }
    }
     
    static shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }*/

/*
   getAnswers(correctAnswer, uniqueArtistsArr) {
        let arrFrom4 =[correctAnswer];
        while (arrFrom4.length !== NUMBER_OF_ANSWERS_PER_QUESTION) {
          let randomAnswerIndex = Math.floor(Math.random() * uniqueArtistsArr.length);
          //uniqueArtistsArr.length
          let randomAnswer = uniqueArtistsArr[randomAnswerIndex]
          if (randomAnswer != correctAnswer && !arrFrom4.includes(randomAnswer)){
            arrFrom4.push(randomAnswer);
          }
        }
        
       arrFrom4 = ArtistRound.shuffleArray(arrFrom4);

        return arrFrom4;
    }

    getCorrectAnswer(){
      return this.getCurrentQuestion().author;
    }

    clearAllAnswers() {
      this.artistQuestionArray.forEach(q=>{
        q.isAnswered = false;
        q.isAnsweredCorrectly = false;
      })
    }
} */
