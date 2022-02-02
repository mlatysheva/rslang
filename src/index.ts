import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { getWord, getWords } from './js/api';
import { Word } from './js/Word';

console.log('App is running');

navigation();

async function words(page: number) {
  const items = await getWords(page);
  // console.log(`items are ${items}`);
}
words(1);



async function word(id: string) {
  const word = await getWord(id);
  // console.log(`item is ${word}`);
}
word('5e9f5ee35eb9e72bc21af4c9');
