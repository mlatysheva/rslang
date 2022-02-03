import { Word } from "../js/types";
import { imgLink } from "../js/constants";
//import { serwerGetWordById } from 

export class CardElement {
  data: Word;
  alt: string;
  
  constructor (cardDataObject: Word) {
    this.data = cardDataObject;
    this.alt = `${cardDataObject.group}-${cardDataObject.word}`;  
  }

  renderCard(): HTMLElement {
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-num", `${this.data.group}-${this.data.id}`);

    let photoTitlSound =  document.createElement("div");
    photoTitlSound.classList.add("photoTitlSound");

    let soundTitle = document.createElement("div");
    soundTitle.classList.add("soundTitle");
    let titleOfCard = document.createElement("h2");
    titleOfCard.classList.add("card-title");
    titleOfCard.textContent = this.data.word;
    soundTitle?.appendChild(titleOfCard);
    
    let elemImg = document.createElement("img");
    elemImg.classList.add("card-img");
    elemImg.setAttribute("src", `${imgLink}${this.data.image}`);
    elemImg.setAttribute("alt", this.alt);
    photoTitlSound?.appendChild(elemImg);

    cardElement.appendChild(photoTitlSound);

    let elemText = document.createElement("div");
    elemText.classList.add("card-description");

    let elemTraskTranl = document.createElement("div");
    elemTraskTranl.classList.add("transk-transl");

    let elemTranskription = document.createElement("p");
    elemTranskription.classList.add("transkription");
    elemTranskription.innerText = `${this.data.transcription}`;
    elemTraskTranl.appendChild(elemTranskription);

    let elemTranslation = document.createElement("p");
    elemTranslation.classList.add("translate");
    elemTranslation.innerText = `${this.data.wordTranslate}`;
    elemTraskTranl.appendChild(elemTranslation);

    elemText.appendChild(elemTraskTranl);

    let elemtextMeaning = document.createElement("p");
    elemtextMeaning.classList.add("textMeaning");
    elemtextMeaning.innerText = `${this.data.textMeaning}`;
    elemText.appendChild(elemtextMeaning);

    let elemtextMeaningTranslate = document.createElement("p");
    elemtextMeaningTranslate.classList.add("textMeaningTranslate");
    elemtextMeaningTranslate.innerText = `${this.data.textMeaningTranslate}`;
    elemText.appendChild(elemtextMeaningTranslate);

    let elemtextExample = document.createElement("p");
    elemtextExample.classList.add("textExample");
    elemtextExample.innerText = `${this.data.textExample}`;
    elemText.appendChild(elemtextExample);

   

    
    /*let elemFavoriteFild = document.createElement("p");
    elemFavoriteFild.classList.add("favorite");
    elemFavoriteFild.innerText = `${constantWords.favorite} ${this.unswerIsFavourite()}`;
    elemToy.appendChild(elemFavoriteFild);
    cardElement.appendChild(elemToy);//all properties in card
    let ribbonCard = document.createElement("div");
    ribbonCard.classList.add("ribbon");*/
    cardElement.appendChild(elemText);
    return cardElement;
  }
}