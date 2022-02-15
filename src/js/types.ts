import { AbstractView } from './views/AbstractView';

export interface Route {
  path: string,
  component: AbstractView
}
export interface Word {
  id:string,
  group:number,
  page:number,
  word:string,
  image:string,
  audio:string,
  audioMeaning:string,
  audioExample:string,
  textMeaning:string,
  textExample:string,
  transcription:string,
  wordTranslate:string,
  textMeaningTranslate:string,
  textExampleTranslate:string,
  _id?: string,
}
export interface UserWordParameters {
  difficulty: string,
  optional: {testFieldString: 'test', testFieldBoolean: true}
}
export interface UserWord {
  userId: string,
  wordId: string,
  word: UserWordParameters,
  difficulty?: string,
  optional?: {testFieldString: 'test', testFieldBoolean: true},
  paginatedResults?: Array<Word>, totalCount:Array<number>,

}

export interface TestFieldParameters {
  testFieldString: string,
  testFieldBoolean: boolean
}

export interface User {
  email: string,
  password: string,
}

export interface UserWithName {
  name: string,
  email: string,
  password: string,
}
export interface NewUserDetails {
  id: string,
  email: string,
}

export interface ExistingUserLoginDetails {
  message: string,
  token: string,
  userId: string
}

export interface UserStatistics {
  'learnedWords': number,
  'optional': {}
}
export interface SprintWord {
  id: string,
  sound: string,
  word: string,
  translation: string,
  isCorrectlyAnswered: boolean,
}
