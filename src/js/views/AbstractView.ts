export abstract class AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  abstract getHtml(): Promise<HTMLElement>;
}
