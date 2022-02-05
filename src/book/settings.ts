export function addModal() {
  const modal = document.querySelector('.modal');
  const settingsBtn = document.querySelector('.settings');

  const closeButton = document.querySelector<HTMLButtonElement>('.close-button');

  function toggleModal(): void {
    modal?.classList.toggle('show-modal');
  }
  function removeModal(): void {
    modal?.classList.toggle('show-modal');
  }
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      console.log('click');
      toggleModal();
    });
  }
  closeButton?.addEventListener('click', removeModal);
}
export default addModal;
