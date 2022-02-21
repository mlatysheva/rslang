import { logout } from '../login/loginLogout';
import { getItemFromLocalStorage, setItemToLocalStorage } from './localStorage';
import {
  NewUserDetails, User, UserStatistics, UserWithName, UserWord,
  Word, UserWordParameters, ExistingUserLoginDetails,
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

export const createUser = async (user: User) => {
  try {
    const rawResponse = await fetch(users, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    console.log('User with such email already exists. Please signin.');
    const data = await loginUser(user);
    return data;
  }
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
  return content;
};

export async function getTokens(userId:string) {
  const response = await fetch(`${users}/${userId}/tokens`);
  const data = await response.json();
  return data;
}

export async function getToken(userId: string) {
  let loginTimestamp;
  if (localStorage.getItem('loginTimestamp')) {
    loginTimestamp = parseInt(JSON.parse(localStorage.getItem('loginTimestamp') || ''));
  
    if (((loginTimestamp + (3600 * 1000 * 24)) > Date.now())) {
      return getItemFromLocalStorage('token');
    } else {
      try {
        const tokens = await getTokens(userId);
        setItemToLocalStorage('token', tokens.token);
        setItemToLocalStorage('refreshToken', tokens.refreshToken);
        console.log(`token from server is ${getItemFromLocalStorage('token')}`);
        return tokens.token;
      } catch(err) {
        logout();
      }
    }
  }  
}

export async function getUser(): Promise<UserWithName> {
  const id = getItemFromLocalStorage('id');
  const response = (await fetch(`${users}/${id}`));

  const user: UserWithName = await response.json();
  return user;
}

export const createUserWord = async (userId: string, wordId: string, body: UserWordParameters) => {
  // variable to add to correct answers if such userWord already exists
  const correctlyAnswered = body.optional?.sprintCorrectlyAnswered;
  try {
    const token = getItemFromLocalStorage('token');
    // const token = getToken(userId);

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
  } catch {
    async (error: any) => {
    // if (error) {
    //   console.log('such user word already exists');
    // const response = await getUserWord(userId, wordId);
    // const existingDifficulty = response.difficulty;
    // let existingSprintCorrectAnswers = response.sprintCorrectlyAnswered;
    // let existingSprintTotalAnswers = response.sprintTotalAnswers;
    // const newBody = {
    //   difficulty: existingDifficulty,
    //   optional: { sprintNewWord: false, sprintCorrectlyAnswered: existingSprintCorrectAnswers + correctlyAnswered, sprintTotalAnswers: existingSprintTotalAnswers++ }
    // }
    // await updateUserWord (userId, wordId, newBody);
    // }
      throw error;
    };
  }
};

export const updateUserWord = async (userId: string, wordId: string, body: UserWordParameters) => {
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);

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
    console.log('user word was successfully updated');
  } else if (response.status === 401) {
    console.log('user has to login again');
  } else if (response.status === 404) {
    console.log('User word does not exist. Adding new user word');
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
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);

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
    const token = getItemFromLocalStorage('token');
    // const token = getToken(userId);

    const rawResponse = await fetch(`${users}/${userId}/words/${wordId}`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    const response = await rawResponse.json();
    return response;
  } catch (err) {
    console.log('Such user word does not exist');
    // const body = {
    //   difficulty: 'normal',
    //   // optional: { newWord: true, correctlyAnswered: 1, incorrectlyAnswered: 0},
    // }
    // await createUserWord(userId, wordId, body);
  }
};

export const getUserWordsAll = async (userId: string):Promise<UserWord[]> => {
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);
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
  const token = getItemFromLocalStorage('token');
  // const token = await getToken(userId);
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
    console.log('User is not authenticated. Please login or signup.')
    throw (err);
  }
};

export const putUserStatistics = async (data: UserStatistics) => {
  const userId = getItemFromLocalStorage('id');
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);
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
    return rawResponse;
  } catch (err) {
    throw (err);
  }
};

export const getUserDifficultWords = async (userId: string):Promise<UserWord[]> => {
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);

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
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);

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

export const getUserLearnDiffWords = async (userId: string):Promise<UserWord[]> => {
  const token = getItemFromLocalStorage('token');
  // const token = getToken(userId);

  const rawResponse = await fetch(`${users}/${userId}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"learned-word"}, {"userWord.difficulty":"difficult-word"}]}`, {
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
