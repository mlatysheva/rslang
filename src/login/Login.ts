import { AbstractView } from "../js/views/AbstractView";

export class Login extends AbstractView {
  constructor() {
    super();
    // this.setTitle('Login');
  }

  async getHtml():Promise<HTMLElement> {
    const app = <HTMLElement>document.getElementById('app');

    // TODO: добавить манипуляции с апой

    const footer = <HTMLElement>document.querySelector('.footer');
    footer.classList.remove('hide');

    let htmlElement= document.createElement('div');
    htmlElement.classList.add('view', 'login-view');
    htmlElement.innerHTML = `
    
    <div class="login-wrapper">
    <div class="login-header"></div>
    <form id="login-form" action="#">
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
      
      <input id="login-submit" type="submit" value="Войти">
    </form>
    <div class="sign-txt">ИЛИ</div>
    <a href="#/signup/" id="signup-btn" class="signup-btn" data-href="#/signup/">Зарегистрироваться</a>
    </div>
    </div>
    `;
    return htmlElement;
  }
}
export default Login;
