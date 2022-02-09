import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';
// import { serwerGetWordById } from

export class CardElement {
  data: Word;

  alt: string;

  constructor(cardDataObject: Word) {
    this.data = cardDataObject;
    this.alt = `${cardDataObject.group}-${cardDataObject.word}`;
  }

  getSoundId(): string {
    return `sound-${this.data.id}`;
  }

  getSoundMeaningId(): string {
    return `soundMeaning-${this.data.id}`;
  }

  getSoundExampleId(): string {
    return `soundExample-${this.data.id}`;
  }

  renderCard(): HTMLElement {
    const cardElement = document.createElement('div');
    const soundEnableFunction = sound(this);
    const soundMeaningFunction = soundMeaning(this);
    const soundExampleFunction = soundExample(this);

    cardElement.setAttribute('id', `${this.data.id}`);
    cardElement.classList.add('card');
    if (this.data.group === arrGroup[0]) {
      cardElement.classList.add('card0');
    }
    if (this.data.group === arrGroup[1]) {
      cardElement.classList.add('card1');
    }
    if (this.data.group === arrGroup[2]) {
      cardElement.classList.add('card2');
    }
    if (this.data.group === arrGroup[3]) {
      cardElement.classList.add('card3');
    }
    if (this.data.group === arrGroup[4]) {
      cardElement.classList.add('card4');
    }
    if (this.data.group === arrGroup[5]) {
      cardElement.classList.add('card5');
    }
    cardElement.setAttribute('data-num', `${this.data.group}-${this.data.id}`);

    const photoTitlSound = document.createElement('div');
    photoTitlSound.classList.add('photoTitlSound');

    const soundTitle = document.createElement('div');
    soundTitle.classList.add('soundTitle');

    const titleOfCard = document.createElement('h2');
    titleOfCard.classList.add('card-title');
    titleOfCard.textContent = this.data.word.charAt(0).toUpperCase() + this.data.word.slice(1);
    soundTitle?.appendChild(titleOfCard);

    const elemAudio = document.createElement('button');
    elemAudio.classList.add('player-icon');
    elemAudio.classList.add('play');
    elemAudio.setAttribute('id', this.getSoundId());
    soundTitle.appendChild(elemAudio);
    elemAudio.addEventListener('click', soundEnableFunction);

    photoTitlSound.appendChild(soundTitle);

    const elemImg = document.createElement('img');
    elemImg.classList.add('card-img');
    elemImg.setAttribute('src', `${linkForCard}${this.data.image}`);
    elemImg.setAttribute('alt', this.alt);
    photoTitlSound?.appendChild(elemImg);

    cardElement.appendChild(photoTitlSound);

    const elemText = document.createElement('div');
    elemText.classList.add('card-description');

    const elemTraskTranl = document.createElement('div');
    elemTraskTranl.classList.add('transk-transl');

    const elemTranslation = document.createElement('p');
    elemTranslation.classList.add('translate');
    elemTranslation.innerText = `${this.data.wordTranslate}`;
    elemTraskTranl.appendChild(elemTranslation);

    const elemTranskription = document.createElement('p');
    elemTranskription.classList.add('transkription');
    elemTranskription.innerText = `${this.data.transcription}`;
    elemTraskTranl.appendChild(elemTranskription);

    elemText.appendChild(elemTraskTranl);

    const meaning = document.createElement('div');
    meaning.classList.add('meaning');
    const elemAudioMeaning = document.createElement('button');
    elemAudioMeaning.classList.add('player-icon');
    elemAudioMeaning.classList.add('play');
    elemAudioMeaning.setAttribute('id', this.getSoundMeaningId());
    meaning.appendChild(elemAudioMeaning);
    elemAudioMeaning.addEventListener('click', soundMeaningFunction);

    const elemtextMeaning = document.createElement('p');
    elemtextMeaning.classList.add('textMeaning');
    elemtextMeaning.innerHTML = `${this.data.textMeaning}`;
    meaning.appendChild(elemtextMeaning);
    elemText.appendChild(meaning);

    const elemtextMeaningTranslate = document.createElement('p');
    elemtextMeaningTranslate.classList.add('textMeaningTranslate');
    elemtextMeaningTranslate.innerText = `${this.data.textMeaningTranslate}`;
    elemText.appendChild(elemtextMeaningTranslate);

    const example = document.createElement('div');
    example.classList.add('example');
    const elemAudioExample = document.createElement('button');
    elemAudioExample.classList.add('player-icon');
    elemAudioExample.classList.add('play');
    elemAudioExample.setAttribute('id', this.getSoundExampleId());
    example.appendChild(elemAudioExample);
    elemAudioExample.addEventListener('click', soundExampleFunction);

    const elemtextExample = document.createElement('p');
    elemtextExample.classList.add('textExample');
    elemtextExample.innerHTML = `${this.data.textExample}`;
    example.appendChild(elemtextExample);
    elemText.appendChild(example);

    const elemtextExampleTranslate = document.createElement('p');
    elemtextExampleTranslate.classList.add('textExampleTranslate');
    elemtextExampleTranslate.innerHTML = `${this.data.textExampleTranslate}`;
    elemText.appendChild(elemtextExampleTranslate);

    const difficultBtn = document.createElement('button');
    difficultBtn.classList.add('difficult');
    difficultBtn.innerText = 'difficult';
    difficultBtn.setAttribute('id', `difficult${this.data.id}`);
    cardElement.appendChild(elemText);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'delete';
    deleteBtn.setAttribute('id', `delete${this.data.id}`);

    const containerBtns = document.createElement('div');
    containerBtns.classList.add('card-buttons');
    containerBtns.appendChild(difficultBtn);
    containerBtns.appendChild(deleteBtn);
    cardElement.appendChild(containerBtns);

    const correctBtn = document.createElement('button');
    correctBtn.classList.add('correct');
    correctBtn.innerText = '0';
    correctBtn.setAttribute('data-tooltip', 'correct answers');

    const incorrectBtn = document.createElement('button');
    incorrectBtn.classList.add('incorrect');
    incorrectBtn.innerText = '0';
    incorrectBtn.setAttribute('data-tooltip', 'incorrect answers');
    const infoBtn = document.createElement('div');
    infoBtn.classList.add('info');
    infoBtn.appendChild(correctBtn);
    infoBtn.appendChild(incorrectBtn);
    cardElement.appendChild(infoBtn);

    document.body.addEventListener('click', async (e) => {
      if (e.target) {
        const id = (e.target as HTMLElement).id.split('level')[1];
        if (id === '6') {
          console.log(difficultBtn);
          if (difficultBtn) difficultBtn.remove();
          deleteBtn.innerText = '';
          deleteBtn.innerText = 'non difficult';
        }
      }
    });

    return cardElement;
  }
}

function sound(cardElement: CardElement): (e: MouseEvent) => void {
  return function (e: MouseEvent) {
    const changeSoundBtn = document.getElementById(cardElement.getSoundId()) as HTMLElement;
    const audio = new Audio();
    const audioSrc = `${linkForCard}${cardElement.data.audio}`;

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

function soundMeaning(cardElement: CardElement): (e: MouseEvent) => void {
  return function (e: MouseEvent) {
    const changeSoundBtn = <HTMLButtonElement>document.getElementById(cardElement.getSoundMeaningId());
    const audio = new Audio();
    const audioSrc = `${linkForCard}${cardElement.data.audioMeaning}`;

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

function soundExample(cardElement: CardElement): (e: MouseEvent) => void {
  return function (e: MouseEvent) {
    const changeSoundBtn = document.getElementById(cardElement.getSoundExampleId()) as HTMLElement;
    const audio = new Audio();
    const audioSrc = `${linkForCard}${cardElement.data.audioExample}`;

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

function changeCardForDifficultPage() {
  document.body.addEventListener('click', async (e) => {
    if (e.target) {
      const id = (e.target as HTMLElement).id.split('level')[1];
      if (id === '6') {
        const difficultBtn = document.querySelector('difficult');
        const deleteBtn = document.querySelector('delete');
        if (difficultBtn) difficultBtn.remove();
        if (deleteBtn) deleteBtn.innerHTML = 'non difficult';
      }
    }
  });
}

export default CardElement;
