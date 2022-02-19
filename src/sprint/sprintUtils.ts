import { sound } from "../game1/statisticGame1";
import { createUserWord, getUserWord, getWords, updateUserWord } from "../js/api";
import { PAGES_PER_GROUP, WORDS_PER_PAGE } from "../js/constants";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../js/localStorage";
import { clearAllChildNodes } from "../js/router";
import { UserWordParameters, Word } from "../js/types";
import { Sprint } from "./Sprint";

/* return array of 80 words containing of a random page from the chosen level
  and words from previous pages of the same level or
  words from the previous level 
*/

export async function getArrayOfWords(level: number) {
  let page = getRandomNumber(PAGES_PER_GROUP);
  let additionalwords: Word[] = [];
  let items;
  items = await getWords(level, page);

  if (page > 1) {
    additionalwords = await getWords(level, page - 1);
    items = items.concat(additionalwords);
    if (page > 2) {
      additionalwords = await getWords(level, page - 2);
      items = items.concat(additionalwords);
      if (page > 3) {
        additionalwords = await getWords(level, page - 3);
        items = items.concat(additionalwords);
      }
    }
  } else {
    if (level > 1) {
      additionalwords = await getWords(level - 1, 5);
      items = items.concat(additionalwords);
      additionalwords = await getWords(level - 1, 4);
      items = items.concat(additionalwords);
    }
  }

  return items;
}

// toggle level-selection screen and main game screen

export async function replay() {
  const newSprint = new Sprint();
  const app = <HTMLElement>document.getElementById('app');

  clearAllChildNodes(app);
  app.appendChild(await newSprint.getHtml());
}

export function getRandomNumber(num: number) {
  return Math.floor(Math.random() * num);
}

// create an array of random answers
export function getRandomAnswers(num: number, words: Word[]) {
  let arrayOfAnswers: string[] = [];

  for (let i = 0; i < num; i++) {
    arrayOfAnswers.push(words[getRandomNumber(WORDS_PER_PAGE)].wordTranslate);
  }
  return arrayOfAnswers;
}

// show number of level on the main sprint game screen
export function renderLevel(level: number) {
  const levelSpan = document.getElementById('sprint-level');
  (<HTMLElement>levelSpan).innerText = (level + 1).toString();
}

// update points if the answer is correct
export function refreshPoints(points: number) {
  const pointsDiv = document.getElementById('sprint-points');
  (<HTMLElement>pointsDiv).innerText = points.toString();
}

export function playsound() {
  const resultsTable = <HTMLElement>document.querySelector('.sprint-results');
  const tracks = resultsTable.querySelectorAll('.player-icon');
  Array.from(tracks).forEach((element) => {
    const elementId = element.id;
    const src = elementId.split('-')[1];
    (element as HTMLElement).addEventListener('click', sound(elementId, src));
  });
}

export async function postWordToServer(userId: string, wordId: string, correctlyAnswered: number) {

  // correctlyAnswered is 1 for true and 0 for false
  // this body will be used for posting a new word
  let body: UserWordParameters = {
    difficulty: 'normal',
    optional: { sprintNewWord: true, sprintCorrectlyAnswered: correctlyAnswered, sprintTotalAnswers: 1}
  }
  // the word is new and does not exist

  const serverWord = await createUserWord(userId, wordId, body);

  if (!serverWord) {
    console.log('such user word already exists');
    const body = await getUserWord(userId, wordId);
    
    let existingDifficulty;
    if (body.difficulty) {
      existingDifficulty = body.difficulty;
    } else existingDifficulty = 'normal';

    let existingSprintCorrectAnswers;
    if (body.sprintCorrectlyAnswered) {
      existingSprintCorrectAnswers = body.sprintCorrectlyAnswered;
    } else {
      existingSprintCorrectAnswers = 0;
    }
    let existingSprintTotalAnswers;
    if (body.sprintTotalAnswers) {
      existingSprintTotalAnswers = body.sprintTotalAnswers;
    } else {
      existingSprintTotalAnswers = 0;
    }        
    
    const newBody = {
      difficulty: existingDifficulty,
      optional: { sprintNewWord: false, sprintCorrectlyAnswered: existingSprintCorrectAnswers + correctlyAnswered, sprintTotalAnswers: existingSprintTotalAnswers++ }
    }
    await updateUserWord (userId, wordId, newBody);
  }
}

export function findSprintLongestSeries(array: number[] ) {
  let longestSeries: number;
  if (getItemFromLocalStorage('sprintLongestSeries')) {
    longestSeries = getItemFromLocalStorage('sprintLongestSeries');
  } else {
    longestSeries = 0;
    setItemToLocalStorage('sprintLongestSeries', 0);
  }

  let maxTimes = 0, currentTimes = 1;

  array.reduce( (prev, current) => {
    if (prev === current && current === 1) {
      currentTimes = currentTimes + 1;

      if (currentTimes > maxTimes) {
        maxTimes = currentTimes;
      }
    } else {
      currentTimes = 1;
    }
    return current;
  }, maxTimes);
  let currentlongestSeries = maxTimes;
  if (currentlongestSeries > longestSeries) {
    setItemToLocalStorage('sprintLongestSeries', currentlongestSeries);
  }
};