export function toggleHamburgerMenu() {
  const hamburger = <HTMLElement>document.querySelector('.hamburger');
  const navMenu = <HTMLElement>document.querySelector('.nav-menu');
  const loginLink = <HTMLElement>document.querySelector('.login-link');

  // const body = <HTMLElement>document.querySelector(".body");

  function smallscreenMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
  (<HTMLElement>hamburger).addEventListener('click', smallscreenMenu);
  navMenu.addEventListener('click', closeMenu);
  loginLink.addEventListener('click', closeMenu);
}
export default toggleHamburgerMenu;
