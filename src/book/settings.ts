export function addModal() {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const settingsBtn = document.querySelector('.settings');
  const closeBtn = document.querySelector<HTMLButtonElement>('.close-button');
  const showTranslation = document.querySelector<HTMLElement>('.show-translation');
  const translation = document.querySelectorAll('.textMeaningTranslate');
  const saveBtn = document.querySelector<HTMLButtonElement>('.save');

  function toggleModal(): void {
    modal?.classList.add('show-modal');
  }
  function removeModal(): void {
    modal?.classList.remove('show-modal');
  }

  function toggleTranslate(): void {
    translation.forEach((element) => {
      element.classList.toggle('hide');
    });
  }
  settingsBtn?.addEventListener('click', toggleModal);
  closeBtn?.addEventListener('click', removeModal);
  // document.addEventListener('click', (e) => {
  //   e.stopPropagation();
  //   if (modalContent) {
  //     if (e.target !== modalContent) { removeModal(); }
  //   }
  // });
  saveBtn?.addEventListener('click', removeModal);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      removeModal();
    }
  });

  showTranslation?.addEventListener('click', () => {
    toggleTranslate();
  });
}
export default addModal;
