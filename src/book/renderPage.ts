import { getWords } from '../js/api';
import { CardElement } from '../card/cardElement';

export async function renderPage(group: number, page: number) : Promise<HTMLElement> {
    let Page = document.createElement('div');
    Page.classList.add('book'); 
    const data = await getWords(group, page);
    data.forEach((element) => {
        const cardOnPage = new CardElement(element).renderCard();
        if (Page) Page.appendChild(cardOnPage);
     })
      return Page;
  } 