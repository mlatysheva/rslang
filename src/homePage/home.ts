
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