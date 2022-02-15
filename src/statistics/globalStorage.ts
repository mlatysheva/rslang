export const learnedWords: string[] = [];

localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
const wordsfromSS = JSON.parse(localStorage.getItem('learnedWords') as string);

// global variable to store ids of difficult words - words that the user marked as such in the text book or
// did not guess correctly in mini games
export const difficultWords: string[] = [];
localStorage.setItem('difficultWords', JSON.stringify(difficultWords));