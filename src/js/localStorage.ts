export function getItemFromLocalStorage(item: string) {
  if (localStorage.getItem(item) !== null) {
    return JSON.parse(localStorage.getItem(item) as string);
  } else {
    return '';
  }
}

export function setItemToLocalStorage(item: string, value: any) {
  localStorage.setItem(item, JSON.stringify(value));
}
