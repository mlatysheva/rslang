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
import { updateStatistics } from './statistics/globalStorage';
import { replay } from './sprint/sprintUtils';
import { listenForLogin } from './login/listenForLogin';
import { listenForSprint, listenForSprintKeyboard } from './sprint/listenForSprint';

console.log('App is running');     

const app = <HTMLElement>document.getElementById('app');

// global variable to store ids of learned words - correctly guessed words in mini games

navigation();
toggleHamburgerMenu();
renderUserName();
logout();
updateStatistics();

listenForLogin();

listenForSprint();

listenForSprintKeyboard();