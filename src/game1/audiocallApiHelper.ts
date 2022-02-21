import { getUserStatistics, putUserStatistics } from '../js/api';
import { UserStatistics } from '../js/types';
import { DEFAULT_STATISTICS } from '../login/registerNewUser';
import { getTodayDate } from './localStorageHelper';

export async function resetStatistics(): Promise<void> {
  // api
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

export async function getLastVisitedDate(): Promise<string> {
  const statistics: UserStatistics = await getStatistics();
  return statistics.optional!.lastVisitDate || '';
}

async function getStatistics(): Promise<UserStatistics> {
  const res = await getUserStatistics();
  const statistics = await res.json();
  return <UserStatistics>statistics;
}

export async function setTrueQuestionsPerDay(q: number): Promise<void> {
  let data: UserStatistics = await getStatistics();
  if (!data) {
    data = { ...DEFAULT_STATISTICS };
  }
  data!.optional!.audiocallTrueQuestionsPerDay = q;
  // api
  delete data.id;
  await putUserStatistics(data);
}
export async function setCurrentLongestTrueQuestionsPerDay(q: number): Promise<void> {
  let data: UserStatistics = await getStatistics();
  if (!data) {
    data = { ...DEFAULT_STATISTICS };
  }
  data!.optional!.audiocallCurrentLongestSeries = q;

  // api
  delete data.id;
  await putUserStatistics(data);
}

export async function setLongestTrueQuestionsPerDay(q: number): Promise<void> {
  let data: UserStatistics = await getStatistics();
  if (!data) {
    data = { ...DEFAULT_STATISTICS };
  }
  data!.optional!.audiocallLongestSeries = q;
  // api
  delete data.id;
  await putUserStatistics(data);
}

export async function setQuestionsPerDay(questionsPerDay: number): Promise<void> {
  let data: UserStatistics = await getStatistics();
  if (!data) {
    data = { ...DEFAULT_STATISTICS };
  }
  data!.optional!.audiocallQuestionsPerDay = questionsPerDay;
  // api
  delete data.id;
  await putUserStatistics(data);
}
