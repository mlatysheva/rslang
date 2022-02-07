import { getUserStatistics } from "../js/api";

export async function renderForUnregisteredUser() {
  let html = '';

}

export async function renderForRegisteredUser() {
  let html = await getUserStatistics();
  console.log(`statistics is ${html}`);
}