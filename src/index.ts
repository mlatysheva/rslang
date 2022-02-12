import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { getWord, getWords } from './js/api';
import { Word } from './js/types';
import { toggleHamburgerMenu } from './homePage/hamburgerMenu';
import { authenticateUser } from './login/authenticateExistingUser';
import { Signup } from './login/Signup';
import { Login } from './login/Login';
import { registerUser } from './login/registerNewUser';
import { logout, renderUserName } from './login/loginLogout';
import { startSprintGame } from './sprint/sprintGame';
import './book/pageUp';

console.log('App is running');

const app = <HTMLElement>document.getElementById('app');

navigation();
toggleHamburgerMenu();
renderUserName();
logout();

async function words(group: number, page: number) {
  const items = await getWords(group, page).then((data: Word[]) => {
    console.log(data);
  });
}
words(2, 5);

async function word(id: string) {
  const word = await getWord(id).then((data: Word) => {
    // console.log(`item is ${data.word}`);
    // console.log(data);

  });
}
// word('5e9f5ee35eb9e72bc21af4c9');

export function listenForLogin() {
  document.body.addEventListener('click', async (e: MouseEvent) => { 

    if (e.target) {
      if ((e.target as HTMLElement).id ==='login-submit') {
        authenticateUser();
      }
      if ((e.target as HTMLElement).id ==='signup-submit') {
        registerUser();
      }
      if ((e.target as HTMLElement).id ==='login-btn') {
        const loginComponent = new Login();
        const loginHTML = await loginComponent.getHtml();
        (<HTMLElement>app).appendChild(loginHTML);
      }
      if ((e.target as HTMLElement).id ==='signup-btn') {
        const signupComponent = new Signup();
        const signupHTML = await signupComponent.getHtml();
        (<HTMLElement>app).appendChild(signupHTML);
      }
    }
  })
}

listenForLogin();

export function listenForSprint() {
  document.body.addEventListener('click', async (e: MouseEvent) => { 

    if (e.target) {
      if ((e.target as HTMLElement).classList.contains('sprint-level')) {
        const element = <HTMLElement>e.target;
        const level = parseInt(element.id.split('-')[1]);
        console.log(`level is ${level}`);
        
        startSprintGame(level);
      }
    }
  })
}
listenForSprint();

