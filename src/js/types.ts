import { AbstractView } from './views/AbstractView';

export interface Route {
  path: string;
  component: AbstractView;
}
export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  _id?: string;
}
export interface UserWordParameters {
  difficulty: string;
  optional?: WordOptional;
  newWord?: boolean | undefined;
}
export interface UserWord {
  userId: string;
  wordId: string;
  word: UserWordParameters;
  difficulty?: string;
  optional?: WordOptional;
  paginatedResults?: Array<Word>;
  totalCount: Array<number>;
}
export interface WordOptional {
  sprintNewWord?: boolean | undefined;
  sprintCorrectlyAnswered?: number | undefined;
  sprintTotalAnswers?: number | undefined;
  audiocallNewWord?: boolean | undefined;
  audiocallCorrectlyAnswered?: number | undefined;
  audiocallTotalAnswers?: number | undefined;
}

export interface User {
  email: string;
  password: string;
}

export interface UserWithName {
  name: string;
  email: string;
  password: string;
}
export interface NewUserDetails {
  id: string;
  email: string;
}

export interface ExistingUserLoginDetails {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface UserStatistics {
  id?: string;
  learnedWords?: number;
  optional?: {
    sprintLongestSeries?: number;
    audiocallLongestSeries?: number;
    audiocallCurrentLongestSeries?: number;
    audiocallQuestionsPerDay?: number;
    audiocallTrueQuestionsPerDay?: number;
    lastVisitDate?: string;
  };
}
export interface SprintWord {
  id: string;
  sound: string;
  word: string;
  translation: string;
  isCorrectlyAnswered: boolean;
}
