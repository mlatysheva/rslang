import { getItemFromLocalStorage } from '../js/localStorage';

export function renderUserName() {
  if (getItemFromLocalStorage('email') !== null) {
    const nameField = <HTMLElement>document.querySelector('.user-name');
    (<HTMLElement>nameField).innerHTML = getItemFromLocalStorage('email').split('"').join('');
  }
}

export function logout() {
  const logoutBtn = document.getElementById('signout-link');
  (<HTMLElement>logoutBtn).addEventListener('click', () => {
    if (getItemFromLocalStorage('email') != null) {
      console.log('logout is clicked');
      localStorage.clear();
      // localStorage.removeItem('id');
      // localStorage.removeItem('email');
      // localStorage.removeItem('token');
      renderUserName();
      console.log(`window.location.hash is ${window.location.hash}`);
      window.history.back();
    }
  });
}
