import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { toggleHamburgerMenu } from './homePage/hamburgerMenu';
import { authenticateUser } from './login/authenticateExistingUser';
import { Signup } from './login/Signup';
import { Login } from './login/Login';
import { registerUser } from './login/registerNewUser';
import { logout, renderUserName } from './login/loginLogout';
import { startSprintGame } from './sprint/sprintGame';

console.log('App is running');

const app = <HTMLElement>document.getElementById('app');

// global variable to store ids of learned words - correctly guessed words in mini games
let learnedWords: string[] = [];

localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
let wordsfromSS = JSON.parse(localStorage.getItem('learnedWords') as string);

// global variable to store ids of difficult words - words that the user marked as such in the text book or 
// did not guess correctly in mini games
let difficultWords: string[] = [];
localStorage.setItem('difficultWords', JSON.stringify(difficultWords));

navigation();
toggleHamburgerMenu();
renderUserName();
logout();


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
        
        startSprintGame(level);
      }
    }
  })
}
listenForSprint();

