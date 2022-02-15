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
const learnedWords: string[] = [];

localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
const wordsfromSS = JSON.parse(localStorage.getItem('learnedWords') as string);

// global variable to store ids of difficult words - words that the user marked as such in the text book or
// did not guess correctly in mini games
const difficultWords: string[] = [];
localStorage.setItem('difficultWords', JSON.stringify(difficultWords));

navigation();
toggleHamburgerMenu();
renderUserName();
logout();

export function listenForLogin() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    if (e.target) {
      switch ((e.target as HTMLElement).id) {
        case "login-submit": {
          authenticateUser();
          break;
        }
        case "signup-submit": {
          registerUser();
          break;
        }
        case "login-btn": {
          const loginComponent = new Login();
          const loginHTML = await loginComponent.getHtml();
          (<HTMLElement>app).appendChild(loginHTML);
          break;
        }
        case "signup-btn": {
          const signupComponent = new Signup();
          const signupHTML = await signupComponent.getHtml();
          (<HTMLElement>app).appendChild(signupHTML);
          break;
        }
      }
    }
  });
}

listenForLogin();

export function listenForSprint() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    if (e.target) {
      let level: number = 0;
      if ((e.target as HTMLElement).classList.contains('sprint-level')) {
        const element = <HTMLElement>e.target;
        level = parseInt((element.id.split('-')[1])); 
        console.log(`level button is clicked and level is ${level}`);   
        startSprintGame(level);    
      }  
      // else if ((e.target as HTMLElement).classList.contains('sprint-menu-link')) {
      //   if (localStorage.getItem('currentPage')) {
      //     let levelparsed = JSON.parse((localStorage.getItem('currentPage') as string)).split('-')[0];
      //     level = levelparsed.charAt(levelparsed. length - 1);
      //     console.log(`sprint-menu is clicked and level is ${level}`);
      //     startSprintGame(level);
      //   }
      // }      
    }
  });
}
listenForSprint();
