import { getItemFromLocalStorage } from "../js/localStorage";

export function toggleHamburgerMenu() {
  const hamburger = <HTMLElement>document.querySelector(".hamburger");
  const navMenu = <HTMLElement>document.querySelector(".nav-menu");
  const loginLink= <HTMLElement>document.querySelector(".login-link");
  // const body = <HTMLElement>document.querySelector(".body");

  (<HTMLElement>hamburger).addEventListener("click", smallscreenMenu);

  function smallscreenMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  navMenu.addEventListener('click', closeMenu);
  loginLink.addEventListener('click', closeMenu);

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

export function renderUserName() {
  if (getItemFromLocalStorage('email') !== null) {
    const nameField = <HTMLElement>document.querySelector('.user-name');
    (<HTMLElement>nameField).innerHTML = getItemFromLocalStorage('email').split('"').join('');

  }
}

export function logout() {
  const logoutBtn = document.getElementById("signout-link");
  logoutBtn?.addEventListener('click', () => {
    if (getItemFromLocalStorage('email') != null) {
      localStorage.clear();
      renderUserName();
    }
  })
}