import { getItemFromLocalStorage } from './localStorage';
import {
  ExistingUserLoginDetails, NewUserDetails, User, UserStatistics, UserWithName, UserWord, 
  Word, UserWordParameters,
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
  return data.items;
}

export async function getWord(id: string): Promise<Word> {
  const response = (await fetch(`${words}/${id}`));

  const word: Word = await response.json();
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
};

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
};

export async function getUser(): Promise<UserWithName> {
  const id = getItemFromLocalStorage('id');
  const response = (await fetch(`users/${id}`));

  const user: UserWithName = await response.json();
  return user;
}
const token = getItemFromLocalStorage('token');
export const createUserWord = async (userId: string, wordId: string, body: UserWordParameters) => {
  const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
    method: 'POST',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const content = await rawResponse.json();

  console.log(content);
};

export const deleteUserWord = async (userId: string, wordId: string) => {
  const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
    method: 'DELETE',

    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  });
};
// deleteUserWord('620262a55dbb20001613405b', '5e9f5ee35eb9e72bc21af518');

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

export const getUserWord = async (userId: string, wordId: string) => {
  const token = getItemFromLocalStorage('token');

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

export const getUserWordsAll = async (userId: string):Promise<UserWord[]> => {
  const rawResponse = await fetch(`${users}/${userId}/words`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
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

export const getUserStatistics = async(): Promise<Response> => {
  const userId = getItemFromLocalStorage('id');
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
    return rawResponse;
  }
  catch(err) {
    throw(err);
  }  
}

export const putUserStatistics = async(data: UserStatistics) => {
  const userId = getItemFromLocalStorage('id');
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
      console.log(`status is ${rawResponse.status}`);
    
    return rawResponse;
  }
  catch(err) {
    throw(err);
  }  
}
