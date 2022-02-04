export abstract class AbstractView {
  constructor() {
    document.title = 'Учи английский'
  }

  setTitle(title: string) {
    document.title = title;
  }

  abstract getHtml(): Promise<HTMLElement>;
}