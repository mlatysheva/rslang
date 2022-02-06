import { Word } from '../js/types';
import { linkForCard, arrGroup } from '../js/constants';
//import { serwerGetWordById } from

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
    let cardElement = document.createElement('div');
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

    let photoTitlSound = document.createElement('div');
    photoTitlSound.classList.add('photoTitlSound');

    let soundTitle = document.createElement('div');
    soundTitle.classList.add('soundTitle');

    let titleOfCard = document.createElement('h2');
    titleOfCard.classList.add('card-title');
    titleOfCard.textContent = this.data.word;
    soundTitle?.appendChild(titleOfCard);

    let elemAudio = document.createElement('button');
    elemAudio.classList.add('player-icon');
    elemAudio.classList.add('play');
    elemAudio.setAttribute('id', this.getSoundId());
    soundTitle.appendChild(elemAudio);
    elemAudio.addEventListener('click', soundEnableFunction);

    photoTitlSound.appendChild(soundTitle);

    let elemImg = document.createElement('img');
    elemImg.classList.add('card-img');
    elemImg.setAttribute('src', `${linkForCard}${this.data.image}`);
    elemImg.setAttribute('alt', this.alt);
    photoTitlSound?.appendChild(elemImg);

    cardElement.appendChild(photoTitlSound);

    let elemText = document.createElement('div');
    elemText.classList.add('card-description');

    let elemTraskTranl = document.createElement('div');
    elemTraskTranl.classList.add('transk-transl');

    let elemTranslation = document.createElement('p');
    elemTranslation.classList.add('translate');
    elemTranslation.innerText = `${this.data.wordTranslate}`;
    elemTraskTranl.appendChild(elemTranslation);

    let elemTranskription = document.createElement('p');
    elemTranskription.classList.add('transkription');
    elemTranskription.innerText = `${this.data.transcription}`;
    elemTraskTranl.appendChild(elemTranskription);

    elemText.appendChild(elemTraskTranl);

    let elemtextMeaning = document.createElement('p');
    elemtextMeaning.classList.add('textMeaning');
    elemtextMeaning.innerText = `${this.data.textMeaning}`;
    elemText.appendChild(elemtextMeaning);

    let elemAudioMeaning = document.createElement('button');
    elemAudioMeaning.classList.add('player-icon');
    elemAudioMeaning.classList.add('play');
    elemAudioMeaning.setAttribute('id', this.getSoundMeaningId());
    elemText.appendChild(elemAudioMeaning);
    elemAudioMeaning.addEventListener('click', soundMeaningFunction);

    let elemtextMeaningTranslate = document.createElement('p');
    elemtextMeaningTranslate.classList.add('textMeaningTranslate');
    elemtextMeaningTranslate.innerText = `${this.data.textMeaningTranslate}`;
    elemText.appendChild(elemtextMeaningTranslate);

    let elemtextExample = document.createElement('p');
    elemtextExample.classList.add('textExample');
    elemtextExample.innerText = `${this.data.textExample}`;
    elemText.appendChild(elemtextExample);

    let elemAudioExample = document.createElement('button');
    elemAudioExample.classList.add('player-icon');
    elemAudioExample.classList.add('play');
    elemAudioExample.setAttribute('id', this.getSoundExampleId());
    elemText.appendChild(elemAudioExample);
    elemAudioExample.addEventListener('click', soundExampleFunction);

    let elemtextExampleTranslate = document.createElement('p');
    elemtextExampleTranslate.classList.add('textExampleTranslate');
    elemtextExampleTranslate.innerText = `${this.data.textExampleTranslate}`;
    elemText.appendChild(elemtextExampleTranslate);

    cardElement.appendChild(elemText);

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
