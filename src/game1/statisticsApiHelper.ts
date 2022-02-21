import { getUserStatistics, putUserStatistics } from '../js/api';
import { UserStatistics } from '../js/types';
import { DEFAULT_STATISTICS } from '../login/registerNewUser';
import { getTodayDate } from './localStorageHelper';

async function getStatistics(): Promise<UserStatistics> {
  const res = await getUserStatistics();
  const statistics = await res.json();
  return <UserStatistics>statistics;
}

async function getData(): Promise<UserStatistics> {
  let data: UserStatistics = await getStatistics();
  if (!data) {
    data = { ...DEFAULT_STATISTICS };
  }
  // delete id as server throw 422
  delete data.id;

  return data;
}

export async function resetStatistics(): Promise<void> {
  await putUserStatistics(DEFAULT_STATISTICS);
}

export async function getQuestionsPerDay(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.audiocallQuestionsPerDay || 0;
}

export async function getTrueQuestionsPerDay(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.audiocallTrueQuestionsPerDay || 0;
}

export async function getLongestTrueQuestionsPerDay(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.audiocallLongestSeries || 0;
}

export async function getCurrentLongestTrueQuestionsPerDay(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.audiocallCurrentLongestSeries || 0;
}

export async function getLearnedWords(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.learnedWords || 0;
}

export async function getSprintLongestSeries(): Promise<number> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.sprintLongestSeries || 0;
}

export async function getLastVisitedDate(): Promise<string> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.lastVisitDate || '';
}

export async function setTrueQuestionsPerDay(q: number): Promise<void> {
  const data = await getData();
  data!.optional!.audiocallTrueQuestionsPerDay = q;
  await putUserStatistics(data);
}
export async function setCurrentLongestTrueQuestionsPerDay(q: number): Promise<void> {
  const data = await getData();
  data!.optional!.audiocallCurrentLongestSeries = q;
  await putUserStatistics(data);
}

export async function setLongestTrueQuestionsPerDay(q: number): Promise<void> {
  const data = await getData();
  data!.optional!.audiocallLongestSeries = q;
  await putUserStatistics(data);
}

export async function setQuestionsPerDay(questionsPerDay: number): Promise<void> {
  const data = await getData();
  data!.optional!.audiocallQuestionsPerDay = questionsPerDay;
  await putUserStatistics(data);
}

export async function setLearnedWords(q: number): Promise<void> {
  const data = await getData();
  data!.learnedWords = q;
  await putUserStatistics(data);
}

export async function setSprintLongestSeries(q: number): Promise<void> {
  const data = await getData();
  data!.optional!.sprintLongestSeries = q;
  await putUserStatistics(data);
}
