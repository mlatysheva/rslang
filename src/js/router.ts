import { Home } from '../homePage/Home';
import { Audiocall } from '../game1/Audiocall';
import { Login } from '../login/Login';
import { Error } from './views/Error';
import { Manual } from '../book/Manual';
import { Sprint } from '../sprint/Sprint';
import { Statistics } from '../statistics/Statistics';
import { Route } from './types';
import { Signup } from '../login/Signup';
import { AudiocallUser } from '../game1/AudiocallUser';

export function clearAllChildNodes(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export function toggleActiveMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuItems = document.querySelectorAll('.nav-link');

  (<HTMLElement>navMenu).addEventListener('click', (e) => {
    menuItems.forEach((item) => {
      console.log(  `typeof element is ${typeof(item)}`);
      if ((<HTMLElement>item).classList.contains('active')) {
        (<HTMLElement>item).classList.remove('active');
      }
    });
    (<HTMLElement>e.target).classList.add('active');
  })
}
function navigation() {
  const app = <HTMLElement>document.getElementById('app');

  const homeComponent = new Home();
  const loginComponent = new Login();
  const signupComponent = new Signup();
  const manualComponent = new Manual();
  const audiocallComponent = new Audiocall();
  const sprintComponent = new Sprint();
  const statisticsComponent = new Statistics();
  const audiocallUserComponent = new AudiocallUser();

  const routes = [
    { path: '/', component: homeComponent },
    { path: '/login/', component: loginComponent },
    { path: '/signup/', component: signupComponent },
    { path: '/manual/', component: manualComponent },
    { path: '/audiocall/', component: audiocallComponent },
    { path: '/sprint/', component: sprintComponent },
    { path: '/statistics/', component: statisticsComponent },
    { path: '/audiocall-user/', component: audiocallUserComponent },
  ];

  // find current location by url in the browser

  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

  // find component that corresponds to the current location

  const findComponentByPath = (url: string, urls: Route[]) => urls.find((route) => route.path.match(url)) || undefined;

  const router = async () => {
    // find the component based on the current path
    const path = parseLocation();

    const componentFound = <Route>findComponentByPath(path, routes) || {};
    if (componentFound == null) {
      const errorComponent = new Error();
      clearAllChildNodes(app);
      app.appendChild(await errorComponent.getHtml());
    } else {
      // Render the component in the "app" placeholder
      clearAllChildNodes(app);
      app.appendChild(await componentFound.component.getHtml());
    }
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  const events = ['load', 'hashchange'];
  [...events].forEach((event) => {
    window.addEventListener(event, (e) => {
      const hashClicked = location.hash;

      switch (hashClicked) {
        case '#/':
          break;
        case '#/login/':
          break;
        case '#/signup/':
          break;
        case '#/manual/':
          // const manualMenu = <HTMLElement>document.querySelector("[data-href='#/manual/']");
          // manualMenu.classList.add('active');
          toggleActiveMenu();
          break;
        case '#/audiocall/':
          toggleActiveMenu();

          break;
        case '#/sprint/':
          toggleActiveMenu();

          break;
        case '#/statistics/':
          toggleActiveMenu();

          break;
        case '#/audiocall-user/':
          toggleActiveMenu();

          break;
      }
    });
  });
}

export { navigation };
