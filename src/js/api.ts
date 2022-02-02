import { Word } from "./Word";

const base = 'https://react-learnwords-example.herokuapp.com';

const words = `${base}/words`;
const users = `${base}/users`;
const signin = `${base}/signing`;

export async function getWords (page: number = 1): Promise<Word[]> {
  const response = (await fetch (`${words}?_page=${page}`));

  let data = {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  }
  // console.log(`data is ${data.items[0]}`);
  return data.items;
}

export async function getWord (id: string): Promise<Word> {
  const response = (await fetch (`${words}/${id}`));

  let word: Word = await response.json();
  // console.log(`word is ${word.word}`);
  return word;
}