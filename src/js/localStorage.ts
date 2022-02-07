export function getItemFromLocalStorage(item: string) {
  if (localStorage.getItem(item) !== null) {
    return localStorage.getItem(item) as string;
  } else {
    return '';
  }
}

export function setItemToLocalStorage(item: string, value: string) {
  localStorage.setItem(item, JSON.stringify(value));
}
