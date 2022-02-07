import { Word } from '../js/types';
import { linkForCard, arrGroup, NUMBER_OF_ANSWERS_PER_QUESTION } from '../js/constants';

const arrOfUnswers = ['кот', 'скот', 'крот', 'жpет'];
export class Round {
  data: Word;

  constructor(cardDataObject: Word) {
    this.data = cardDataObject;
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

  renderRound(): any {
    //TODO: normal type
    const soundEnableFunction = sound(this);
    let gameSectionRound = document.createElement('div');
    if (this.data.group === arrGroup[0]) {
      gameSectionRound.classList.add('card0');
    }
    if (this.data.group === arrGroup[1]) {
      gameSectionRound.classList.add('card1');
    }
    if (this.data.group === arrGroup[2]) {
      gameSectionRound.classList.add('card2');
    }
    if (this.data.group === arrGroup[3]) {
      gameSectionRound.classList.add('card3');
    }
    if (this.data.group === arrGroup[4]) {
      gameSectionRound.classList.add('card4');
    }
    if (this.data.group === arrGroup[5]) {
      gameSectionRound.classList.add('card5');
    }
    gameSectionRound.classList.add('round-game1');
    let gameRound = document.createElement('h2');
    gameRound.classList.add('round');
    gameRound.textContent = 'Слушай и жми на правильный перевод:';
    let audio = document.createElement('button');
    audio.classList.add('play');
    audio.classList.add('player-icon');
    audio.classList.add('game1-sound');
    audio.setAttribute('id', this.getAudioId());
    audio.addEventListener('click', soundEnableFunction);
    gameSectionRound.appendChild(gameRound);
    gameSectionRound.appendChild(audio);

    const unswers = document.createElement('div');
    unswers.classList.add('unswers-game1');

    unswers.innerHTML = `
    <button id=unswer0-${this.data.id} class="unswer-btn">${arrOfUnswers[0]}</button>
    <button id=unswer1-${this.data.id} class="unswer-btn">${arrOfUnswers[1]}</button>
    <button id=unswer2-${this.data.id} class="unswer-btn">${arrOfUnswers[2]}</button>
    <button id=unswer3-${this.data.id} class="unswer-btn">${arrOfUnswers[3]}</button>
    `;
    gameSectionRound.appendChild(unswers);

    const nextRound = document.createElement('button');
    nextRound.classList.add('next-round');
    nextRound.innerText = 'Пропустить -->';
    gameSectionRound.appendChild(nextRound);

    return gameSectionRound;
  }
}

function sound(round: Round): (e: MouseEvent) => void {
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
