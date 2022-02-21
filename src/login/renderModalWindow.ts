export function renderModalWindow() {
  const loginBtn = <HTMLElement>document.getElementById('login-link');
  // const body = <HTMLElement>document.getElementById('body');
  (<HTMLElement>loginBtn).addEventListener('click', () => {
    showModalWindow();
  })
}

export function showModalWindow() {
  // <modal> element
  const modal = <HTMLElement>document.getElementById("myModal");

  // <span> element closes the modal
  const span = <HTMLElement>document.getElementsByClassName("close")[0];

  const modalTitle = <HTMLElement>document.getElementById('modal-title');

  // button <Continue> to close the modal window
  const modalLoginBtn = <HTMLElement>document.getElementById('modal-login-btn');

  // Populate the information about the correct painting
  modalTitle.innerText = 'Login';

  // show modal window
  modal.style.display = "block";  

  span.onclick = function() {
    modal.style.display = "none";
  }
  modalLoginBtn.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}