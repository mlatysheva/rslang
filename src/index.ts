import './style.css';
import './css/normalise.css';
import { navigation } from './js/router';
import { getWord, getWords } from './js/api';
import { Word} from './js/types';
import { toggleHamburgerMenu } from './homePage/home';
import { authenticateUser } from './login/authenticateExistingUser';
import { Signup } from './js/views/Signup';
import { Login } from './js/views/Login';
import { registerUser } from './login/ registerNewUser';

console.log('App is running');

const app = <HTMLElement>document.getElementById('app');

navigation();
toggleHamburgerMenu();

async function words(group: number, page: number) {
  const items = await getWords(group, page).then((data: Word[]) =>{
    console.log(data);

  });
}
 words(2, 5);



async function word(id: string) {
  const word = await getWord(id).then((data: Word) =>{
    //console.log(`item is ${data.word}`);
    //console.log(data);

  });
}
// word('5e9f5ee35eb9e72bc21af4c9');


export function listenForLogin() {
  let waiting =  setInterval(() => {
    const loginSubmitBtn = <HTMLButtonElement>document.getElementById('login-submit');
    
    const signupBtn = <HTMLButtonElement>document.getElementById('signup-btn');

    if (signupBtn) {
      clearInterval(waiting);
      loginSubmitBtn?.addEventListener('click', () => {
        console.log(`login button is clicked`);
        authenticateUser();
      })
      signupBtn?.addEventListener('click', async () => {
        console.log(`signup button is clicked`);
        const signupComponent = new Signup();
        const signupHTML = await signupComponent.getHtml();
        (<HTMLElement>app).innerHTML = signupHTML;

        // listen for clicks on newly rendered 'Зарегистрироваться' button
        // const signupSubmitBtn = <HTMLButtonElement>document.getElementById('signup-submit');
        // console.log(`signupSubmitBtn is ${signupSubmitBtn}`);
        // signupSubmitBtn?.addEventListener('click', () => {
        //   console.log(`signup button is clicked`);
        //   registerUser();
        // })
        
        // listen for clicks on newly renderes 'Войти' button
        // const loginBtn = <HTMLButtonElement>document.getElementById('login-btn');
        // loginBtn.addEventListener('click', async () => {
        //   const loginComponent = new Login();
        //   const loginHTML = await loginComponent.getHtml();
        //   (<HTMLElement>app).innerHTML = loginHTML;
        // })
        
      })
    }
  })  
}

listenForLogin();

export function listenForSignup() {


  let waiting =  setInterval(() => {
    const signupSubmitBtn = <HTMLButtonElement>document.getElementById('signup-submit');
    
    const loginBtn = <HTMLButtonElement>document.getElementById('login-btn');

    if (loginBtn) {
      clearInterval(waiting);
    // listen for clicks on newly rendered 'Зарегистрироваться' button
      console.log(`signupSubmitBtn is ${signupSubmitBtn}`);
      signupSubmitBtn?.addEventListener('click', () => {
        console.log(`signup button is clicked`);
        registerUser();
      })
      
      // listen for clicks on newly renderes 'Войти' button
      const loginBtn = <HTMLButtonElement>document.getElementById('login-btn');
      loginBtn.addEventListener('click', async () => {
        const loginComponent = new Login();
        const loginHTML = await loginComponent.getHtml();
        (<HTMLElement>app).innerHTML = loginHTML;
      })
    }
  })
}
listenForSignup();