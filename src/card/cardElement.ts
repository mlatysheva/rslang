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

  renderCard(): HTMLElement {
    let cardElement = document.createElement('div');
    const soundEnableFunction = sound(this);
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

    let elemtextMeaningTranslate = document.createElement('p');
    elemtextMeaningTranslate.classList.add('textMeaningTranslate');
    elemtextMeaningTranslate.innerText = `${this.data.textMeaningTranslate}`;
    elemText.appendChild(elemtextMeaningTranslate);

    let elemtextExample = document.createElement('p');
    elemtextExample.classList.add('textExample');
    elemtextExample.innerText = `${this.data.textExample}`;
    elemText.appendChild(elemtextExample);

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
    console.log(`САУНД СУКА!`);
    const changeSoundBtn = document.getElementById(cardElement.getSoundId()) as HTMLElement;
    const audio = new Audio();

    /*function chooseAudioBtn(e: any) {
      let tree: HTMLElement = e.path.find((htmlElement: HTMLElement) => 
      htmlElement.localName === 'div' && htmlElement.hasAttribute('data-tree'));
      if (!tree) {
        return;
      } 
      let treeImg:string = (tree.attributes as Record<string, any>)["data-tree"].value;
      //console.log(treeImg);
      mainTree.setAttribute("src", `../assets/tree/${treeImg}.png`);
    }  */
    /*let audioSrc:string;
  
    function getValue(){
      audioSrc = "https://rs-lang-mlatysheva.herokuapp.com/files/01_0004_example.mp3";
      // console.log(audio);
      return audioSrc;
    }
  
  
    function playAudio() {
      audio.src = `${audioSrc}`;
      audio.currentTime = 0;
      audio.play();
    }*/

    function pauseAudio() {
      audio.pause();
    }

    function changePlayBtn() {
      changeSoundBtn.classList.toggle('pause');
      changeSoundBtn.classList.toggle('play');
      if (changeSoundBtn.classList.contains('play')) {
        pauseAudio();
      } else {
        // getValue();
        // playAudio();
        console.log('sound');
      }
    }
  };
}
