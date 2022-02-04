import { AbstractView } from "./AbstractView";

export class Signup extends AbstractView {
  constructor() {
    super();
    this.setTitle('Signup');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');    
    footer.classList.remove('hide');

    let htmlElement= document.createElement('div');
    htmlElement.innerHTML = `
    <div class="view login-view">
    <div class="login-wrapper">
    <div class="login-header"></div>
    <form id="signup-form" action="#">
      <div class="field name">
          <div class="input-area">
            <input type="text" placeholder="Имя">
            <i class="error error-icon fas fa-exclamation-circle"></i>
          </div>
          <div class="error error-txt">Имя не может быть пустым</div>
        </div>
      <div class="field email">
        <div class="input-area">
          <input type="text" placeholder="Email">
          <i class="icon fas fa-envelope"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Email не может быть пустым</div>
      </div>
      <div class="field password">
        <div class="input-area">
          <input type="password" placeholder="Пароль">
          <i class="icon fas fa-lock"></i>
          <i class="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div class="error error-txt">Пароль должен содержать не менее 8 символов</div>
      </div>
      
      <input id="signup-submit" type="submit" value="Зарегистрироваться">
    </form>
    <div class="sign-txt">ИЛИ</div>
    <a href="#/login/" id="login-btn" class="login-btn" data-href="#/login/">Войти</a>
  </div>
    </div>
    `;
    return htmlElement;
  }
}

