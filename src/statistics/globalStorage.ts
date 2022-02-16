import { getUserStatistics } from '../js/api';
import { learnedWords } from '../book/learnedWords';

export let sprintLearnedWords: string[];

export function updateStatistics() {
  if (JSON.parse(localStorage.getItem('sprintLearnedWords') as string)) {
    sprintLearnedWords = JSON.parse(localStorage.getItem('sprintLearnedWords') as string);
  } else {
    sprintLearnedWords = [];
    localStorage.setItem('sprintLearnedWords', JSON.stringify(sprintLearnedWords));
  }
}

// global variable to store ids of difficult words - words that the user marked as such in the text book or
// did not guess correctly in mini games
export let difficultWords: string[];

if (JSON.parse(localStorage.getItem('difficultWords') as string)) {
  difficultWords = JSON.parse(localStorage.getItem('difficultWords') as string);
} else {
  difficultWords = [];
  localStorage.setItem('difficultWords', JSON.stringify(difficultWords));
}

export let sprintLongestCorrectSession: number;
