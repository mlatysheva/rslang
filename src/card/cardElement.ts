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
    
    let imgWord = document.createElement("img");
    imgWord.classList.add("card-img");
    imgWord.setAttribute("src", `${imgLink}${this.data.image}`);
    imgWord.setAttribute("alt", this.alt);
    cardElement?.appendChild(imgWord);

   /* let elemToy = document.createElement("div");
    elemToy.classList.add("card-description");

    let elemCountFild = document.createElement("p");
    elemCountFild.classList.add("count");
    elemCountFild.innerText = `${constantWords.count} ${this.data.count}`;
    elemToy.appendChild(elemCountFild);

    let elemYearFild = document.createElement("p");
    elemYearFild.classList.add("year");
    elemYearFild.innerText = `${constantWords.year} ${this.data.year}`;
    elemToy.appendChild(elemYearFild);
    let elemShapeFild = document.createElement("p");
    elemShapeFild.classList.add("shape");
    elemShapeFild.innerText = `${constantWords.shape} ${this.data.shape}`;
    elemToy.appendChild(elemShapeFild);
    let elemColorFild = document.createElement("p");
    elemColorFild.classList.add("color");
    elemColorFild.innerText = `${constantWords.color} ${this.data.color}`;
    elemToy.appendChild(elemColorFild);
    let elemSizeFild = document.createElement("p");
    elemSizeFild.classList.add("size");
    elemSizeFild.innerText = `${constantWords.size} ${this.data.size}`;
    elemToy.appendChild(elemSizeFild);
    let elemFavoriteFild = document.createElement("p");
    elemFavoriteFild.classList.add("favorite");
    elemFavoriteFild.innerText = `${constantWords.favorite} ${this.unswerIsFavourite()}`;
    elemToy.appendChild(elemFavoriteFild);
    cardElement.appendChild(elemToy);//all properties in card
    let ribbonCard = document.createElement("div");
    ribbonCard.classList.add("ribbon");
    cardElement.appendChild(ribbonCard);*/
    return cardElement;
  }
}