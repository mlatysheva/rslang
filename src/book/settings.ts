export function addModal() {
  const modal = document.querySelector<HTMLDivElement>('.modal');
  const modalContent = document.querySelector<HTMLDivElement>('.modal-content');
  const settingsBtn = document.querySelector<HTMLButtonElement>('.settings');
  const closeBtn = document.querySelector<HTMLButtonElement>('.close-button');

  const saveBtn = document.querySelector<HTMLButtonElement>('.save');

  function toggleModal(): void {
    modal?.classList.add('show-modal');
  }
  function removeModal(): void {
    modal?.classList.remove('show-modal');
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
}
export function removeBold(str: string) {
  const value = '<b>';
  const value1 = '</b>';
  const index = str.indexOf(value);
  const index1 = str.indexOf(value1);
  if (index === -1) {
    return str;
  }
  const boldText = str.slice(index + 3, index1).toUpperCase();
  return str.slice(0, index) + boldText + str.slice(index1 + 1 + value.length);
}

export function removeItalic(str: string) {
  const value = '<i>';
  const value1 = '</i>';
  const index = str.indexOf(value);
  const index1 = str.indexOf(value1);
  if (index === -1) {
    return str;
  }
  const italicText = str.slice(index + 3, index1).toUpperCase();
  return str.slice(0, index) + italicText + str.slice(index1 + 1 + value.length);
}

export function toggleTranslate(): void {
  const translateMeaning = document.querySelectorAll('.textMeaningTranslate');
  const translateWord = document.querySelectorAll('.translate');
  const translateExample = document.querySelectorAll('.textExampleTranslate');

  let isTranslate = false;
  const isShowButtons = false;

  translateMeaning.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = true;
    } else {
      element.classList.remove('hide');
      isTranslate = false;
    }
  });
  translateWord.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = true;
    } else {
      element.classList.remove('hide');
      isTranslate = false;
    }
  });
  translateExample.forEach((element) => {
    if (!isTranslate) {
      element.classList.add('hide');
      isTranslate = true;
    } else {
      element.classList.remove('hide');
      isTranslate = false;
    }
  });
  const showTranslation = document.querySelectorAll('.show-translation');
  if (showTranslation) {
    showTranslation.forEach((translate) => {
      translate.addEventListener('click', () => {
        toggleTranslate();
      });
    });
  }
}
export function toggleButtons():void {
  const showButtons = document.querySelectorAll('.show-buttons');
  const containerBtns = document.querySelectorAll('.card-buttons');
  const infoBtn = document.querySelectorAll('.info');
  if (showButtons) {
    showButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (containerBtns) {
          containerBtns.forEach((item) => {
            item.remove();
          });
        }
        if (infoBtn) {
          infoBtn.forEach((item) => {
            item.remove();
          });
        }

        toggleButtons();
      });
    });
  }
}
