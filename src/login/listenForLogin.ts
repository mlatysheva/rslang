import authenticateUser from "./authenticateExistingUser";
import Login from "./Login";
import registerUser from "./registerNewUser";
import { Signup } from "./Signup";

const app = <HTMLElement>document.getElementById('app');
export function listenForLogin() {
  document.body.addEventListener('click', async (e: MouseEvent) => {
    if (e.target) {
      switch ((e.target as HTMLElement).id) {
        case "login-submit": {
          authenticateUser();
          break;
        }
        case "signup-submit": {
          registerUser();
          break;
        }
        case "login-btn": {
          const loginComponent = new Login();
          const loginHTML = await loginComponent.getHtml();
          (<HTMLElement>app).appendChild(loginHTML);
          break;
        }
        case "signup-btn": {
          const signupComponent = new Signup();
          const signupHTML = await signupComponent.getHtml();
          (<HTMLElement>app).appendChild(signupHTML);
          break;
        }
      }
    }
  });
}
