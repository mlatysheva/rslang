export let sprintNewWords: string[];

export function updateStatistics() {
  if (JSON.parse(localStorage.getItem('sprintNewWords') as string)) {
    sprintNewWords = JSON.parse(localStorage.getItem('sprintNewWords') as string);
  } else {
    sprintNewWords = [];
    localStorage.setItem('sprintNewWords', JSON.stringify(sprintNewWords));
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
