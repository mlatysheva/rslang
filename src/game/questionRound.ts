import { Word } from "../js/types";
import { linkForCard, arrGroup } from "../js/constants";

export class roundElement {
  data: Word;
   
  constructor (cardDataObject: Word) {
    this.data = cardDataObject;
  }

  renderRaund():void {
    console.log("round1");
  }
}