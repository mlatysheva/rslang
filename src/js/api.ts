import { getItemFromLocalStorage } from './localStorage';
import {
  NewUserDetails, User, UserStatistics, UserWithName, UserWord,
  Word, UserWordParameters,
} from './types';

const base = 'https://rs-lang-mlatysheva.herokuapp.com';

const words = `${base}/words`;
const users = `${base}/users`;
const signin = `${base}/signin`;
const token = getItemFromLocalStorage('token');

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

export const loginUser = async (user: User) => {
  try {
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
  } catch (error) {
    console.log(`Error ${error}: Such user does not exist. Please sign up.`);
    return error;
  }
};

export async function getUser(): Promise<UserWithName> {
  const id = getItemFromLocalStorage('id');
  const response = (await fetch(`users/${id}`));

  const user: UserWithName = await response.json();
  return user;
}


export const createUserWord = async (userId: string, wordId: string, body: UserWordParameters) => {
  try { 
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
    return content;
  } catch { async (error: any) => {
        if (error) {
          console.log('such user word already exists');
          const response = await getUserWord(userId, wordId);
          const existingDifficulty = response.difficulty;
          const newBody = {
            difficulty: existingDifficulty,
            optional: { newWord: false, correctlyAnswered: 1, incorrectlyAnswered: 0 }
          }
          await updateUserWord (userId, wordId, newBody);
        }
        throw error;
      };
  };
}

export const updateUserWord = async (userId: string, wordId: string, body: UserWordParameters) => {
  const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
    method: 'PUT',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const response = await rawResponse;
  if (response.status === 200) {
    console.log('User word was successfully updated');
  } else if (response.status === 401) {
    console.log('User needs to login again');
  } else if (response.status === 404) {
    console.log('Such user word does not exist. Adding new user word');
    await createUserWord(userId, wordId, body);
  }
  return response.json()
  .catch((error) => {
    if (error) {
      throw error;
    }
  });
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

export const getUserWord = async (userId: string, wordId: string) => {
  try {
    const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const response = await rawResponse;
    const content = await response.json(); 
    
    if (response.status === 200) {
      console.log('User word exists');
    } 
    return content.body; 
  } catch(err) {
    console.log(`Сreating new user word`);
    const body = {
      difficulty: 'normal',
      optional: { newWord: true, correctlyAnswered: 1, incorrectlyAnswered: 0},
    }
    await createUserWord(userId, wordId, body);
    
  }
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

  return content;
};


export const getUserStatistics = async (): Promise<Response> => {
  const userId = getItemFromLocalStorage('id');
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
  } catch (err) {
    throw (err);
  }
};

export const putUserStatistics = async (data: UserStatistics) => {
  const userId = getItemFromLocalStorage('id');
   try {
    const rawResponse = await fetch(`${users}/${userId}/statistics`, {
      method: 'PUT',
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
  } catch (err) {
    throw (err);
  }
};

export const getUserDifficultWords = async (userId: string):Promise<UserWord[]> => {
  const rawResponse = await fetch(`${users}/${userId}/aggregatedWords?wordsPerPage=20&filter={"$or":[{"userWord.difficulty":"difficult-word"}]}`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
};

export const getUserLearnedWords = async (userId: string):Promise<UserWord[]> => {
  const rawResponse = await fetch(`${users}/${userId}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"learned-word"}]}`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
};
