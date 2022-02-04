import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { getWord, getWords } from './js/api';
import { Word} from './js/types';
import { toggleHamburgerMenu } from './homePage/home';

console.log('App is running');

navigation();
toggleHamburgerMenu();

async function words(group: number, page: number) {
  const items = await getWords(group, page).then((data: Word[]) =>{
    console.log(data);

  });
}
 words(2, 5);



async function word(id: string) {
  const word = await getWord(id).then((data: Word) =>{
    //console.log(`item is ${data.word}`);
    //console.log(data);

  });
}
// word('5e9f5ee35eb9e72bc21af4c9');
