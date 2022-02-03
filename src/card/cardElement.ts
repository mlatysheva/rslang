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
    let titleOfCard = document.createElement("h2");
    titleOfCard.classList.add("card-title");
    titleOfCard.textContent = this.data.word;
    cardElement?.appendChild(titleOfCard);
    
    let elemImg = document.createElement("img");
    elemImg.classList.add("card-img");
    elemImg.setAttribute("src", `${imgLink}${this.data.image}`);
    elemImg.setAttribute("alt", this.alt);
    cardElement?.appendChild(elemImg);

    let elemText = document.createElement("div");
    elemText.classList.add("card-description");

    let elemTranskription = document.createElement("p");
    elemTranskription.classList.add("transkription");
    elemTranskription.innerText = `${this.data.transcription}`;
    elemText.appendChild(elemTranskription);

    let elemTranslation = document.createElement("p");
    elemTranslation.classList.add("translate");
    elemTranslation.innerText = `${this.data.wordTranslate}`;
    elemText.appendChild(elemTranslation);

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