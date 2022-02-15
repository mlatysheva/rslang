export let learnedWords: string[];

if (JSON.parse(localStorage.getItem('learnedWords') as string)) {
  learnedWords = JSON.parse(localStorage.getItem('learnedWords') as string)
} else {
  learnedWords = [];
  localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
}

// global variable to store ids of difficult words - words that the user marked as such in the text book or
// did not guess correctly in mini games
export let difficultWords: string[];

if (JSON.parse(localStorage.getItem('difficultWords') as string)) {
  difficultWords = JSON.parse(localStorage.getItem('difficultWords') as string)
} else {
  difficultWords = [];
  localStorage.setItem('difficultWords', JSON.stringify(difficultWords));
}