import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { toggleHamburgerMenu } from './homePage/hamburgerMenu';
import { authenticateUser } from './login/authenticateExistingUser';
import { Signup } from './login/Signup';
import { Login } from './login/Login';
import { registerUser } from './login/registerNewUser';
import { logout, renderUserName } from './login/loginLogout';
import { replay, startSprintGame } from './sprint/sprintGame';
import { updateStatistics } from './statistics/globalStorage';

console.log('App is running');

const app = <HTMLElement>document.getElementById('app');

// global variable to store ids of learned words - correctly guessed words in mini games

navigation();
toggleHamburgerMenu();
renderUserName();
logout();
updateStatistics();

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
  document.body.addEventListener('click', async (e) => {
    if (e.target) {

      let level: number;
      if ((e.target as HTMLElement).classList.contains('sprint-level')) {
        const element = <HTMLElement>e.target;
        level = parseInt((element.id.split('-')[1])); 
        await startSprintGame(level);    
      } 
      if ((e.target as HTMLElement).id == 'sprint') {
        
        window.location.hash = '/sprint';
        if (localStorage.getItem('currentPage')) {
          let levelparsed = JSON.parse((localStorage.getItem('currentPage') as string)).split('-')[0];
          level = parseInt(levelparsed.charAt(levelparsed.length - 1));
          if (level == 7) {
            level = 6;
          }
        } else {
          level = 0;
        }
        replay();
        await startSprintGame(level);
      }
    }
  })
}

listenForSprint();
