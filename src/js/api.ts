import { getItemFromLocalStorage } from './localStorage';
import {
  ExistingUserLoginDetails, NewUserDetails, User, UserStatistics, UserWord, Word,
} from './types';

const base = 'https://rs-lang-mlatysheva.herokuapp.com';

const words = `${base}/words`;
const users = `${base}/users`;
const signin = `${base}/signin`;

export async function getWords(group: number, page: number): Promise<Word[]> {
  const response = (await fetch(`${words}?group=${group}&page=${page}`));

  const data = {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
  // console.log(`data is ${data.items[0]}`);
  return data.items;
}

export async function getWord(id: string): Promise<Word> {
  const response = (await fetch(`${words}/${id}`));

  const word: Word = await response.json();
  // console.log(`word is ${word.word}`);
  return word;
}

export const createUser = async (user: User): Promise<NewUserDetails> => {
  const rawResponse = await fetch(users, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  console.log(`in create user content.id is ${content.id}`);

  return content;
  // assign id: string to new user automatically
  // {id: '61fa90af95fa390015feec46', email: 'example@google.mail'}
};

// createUser({ "email": "example@google.mail", "password": "nwekjsf13243" });

export const loginUser = async (user: User): Promise<ExistingUserLoginDetails> => {
  const rawResponse = await fetch(signin, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  console.log(`in login user id is ${content.id}`);

  return content;
  // "message":"Authenticated",
  // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzk5M2RmNGNhOWQ2MDAxNzg3NDBhZSIsImlhdCI6MTU5MDI2OTE1OCwiZXhwIjoxNTkwMjgzNTU4fQ.XHKmdY_jk1R7PUbgCZfqH8TxH6XQ0USwPBSKNHMdF6I",
  // "userId":"5ec993df4ca9d600178740ae"
};

// loginUser({ "email": "sample@user123.com", "password": "qwerty1234" });

const token = getItemFromLocalStorage('token');

const createUserWord = async (userId: string, wordId: string, word: string) => {
  const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
    method: 'POST',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const content = await rawResponse.json();

  console.log(content);
};

// createUserWord({
//   userId: "5ec993df4ca9d600178740ae",
//   wordId: "5e9f5ee35eb9e72bc21af716",
//   word: { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
// });
// Console: {
//   "id":"5ec9a92acbbd77001736b167",
//   "difficulty":"weak",
//   "optional":{
//     "testFieldString":"test",
//     "testFieldBoolean":true
//   },
//   "wordId":"5e9f5ee35eb9e72bc21af716"
// }

const getUserWord = async (userId: string, wordId: string) => {
  const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();

  console.log(content);
};

// getUserWord({
//   userId: "5ec993df4ca9d600178740ae",
//   wordId: "5e9f5ee35eb9e72bc21af716"
// });

// Console: {
//   "id":"5ec9a92acbbd77001736b167",
//   "difficulty":"weak",
//   "optional":{
//     "testFieldString":"test",
//     "testFieldBoolean":true
//   },
//   "wordId":"5e9f5ee35eb9e72bc21af716"
// }

export const getUserStatistics = async() => {
  const userId = getItemFromLocalStorage('id');
  console.log(`userID is ${userId}`);
  const token = getItemFromLocalStorage('token');
  try {
    const rawResponse = await fetch(`${users}/${userId}/statistics`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });  
    const result = await rawResponse;
    if (result.status == 200) {
      return result.json();
    }
    if (result.status == 404) {
      console.log('Ты еще не начал учиться, а уже хочешь статистику смотреть!');
      return {
        "learnedWords": 0,
      }
    }
    if (result.status == 401) {
      console.log('Истек срок действия токена. Зарегистрируйся заново');
      return {};
    }
  }
  catch(err) {
    console.log(`err is ${err}`);
  }  
}

export const putUserStatistics = async(data: UserStatistics) => {
  const userId = getItemFromLocalStorage('id');
  console.log(`userID is ${userId}`);
  const token = getItemFromLocalStorage('token');
  try {
    const rawResponse = await fetch(`${users}/${userId}/statistics`, {
      method: 'OUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      });
    
    const result = await rawResponse;
    if (result.status == 200) {
      return result.json();
    }
    if (result.status == 400) {
      return 'Bad request';
    }
    if (result.status == 401) {
      return 'Истек срок действия токена. Зарегистрируйся заново';
    }
  }
  catch(err) {
    console.log(`err is ${err}`);
  }  
}
