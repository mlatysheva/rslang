import { renderPage } from '../book/renderPage';

export let currentPage = 0;
export let group = 0;
export const totalPages = 30;

export async function prevPage(): Promise<void> {
  if (currentPage > 1) {
    // eslint-disable-next-line no-plusplus
    currentPage--;
    await renderPage(group, currentPage);
  }
}

export async function nextPage(): Promise<void> {
  if (currentPage < totalPages) {
    currentPage += 1;
    await renderPage(group, currentPage);
  }
}
