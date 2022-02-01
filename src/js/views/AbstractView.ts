export class AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  getHtml() {
    return '';
  }
}