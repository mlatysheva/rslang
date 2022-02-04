import { loginUser } from "../js/api";
import { setItemToLocalStorage } from "../js/localStorage";

export function authenticateUser() {
  console.log('we are in auhenticateUser');
  const form = <HTMLElement>document.getElementById("login-form");
  const eField = <HTMLElement>form.querySelector(".email");
  const eInput = <HTMLInputElement>eField.querySelector("input");
  const pField = <HTMLElement>form.querySelector(".password");
  const pInput = <HTMLInputElement>pField.querySelector("input");

  form.onsubmit = async (e) => {
    e.preventDefault(); //preventing from form submitting
    console.log(`login is clicked`);
    //if email and password is blank then add shake class in it else call specified function
    ((<HTMLInputElement>eInput).value == "") ? eField.classList.add("shake", "error") : checkEmail();
    ((<HTMLInputElement>pInput).value == "") ? pField.classList.add("shake", "error") : checkPass();
    setTimeout(()=>{ //remove shake class after 500ms
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);
    eInput.onkeyup = () => { checkEmail(); } 
    pInput.onkeyup = () => { checkPass(); } 

    function checkEmail () { 
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; 
      if (!eInput.value.match(pattern)) { 
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = <HTMLElement>eField.querySelector(".error-txt");
        (eInput.value != "") ? errorTxt.innerText = "Введите правильный Email" : errorTxt.innerText = "Email не может быть пустым";
      } else { 
        eField.classList.remove("error");
        eField.classList.add("valid");
      }
    }

    function checkPass () { 
      if (pInput.value == "" || pInput.value.length < 8) { 
        pField.classList.add("error");
        pField.classList.remove("valid");
        let errorTxt = <HTMLElement>eField.querySelector(".error-txt");
        errorTxt.innerText = "Пароль должен содержать не менее 8 символов";
      } else { 
        pField.classList.remove("error");
        pField.classList.add("valid");
      }
    }
    
    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
      console.log(`action is ${form.getAttribute("action")}`);
      let user = { "email": eInput.value, "password": pInput.value};
      let loginDetails = await loginUser( user );
      setItemToLocalStorage('id', loginDetails.userId);
      setItemToLocalStorage('token', loginDetails.token);
      setItemToLocalStorage('email', eInput.value);
      // console.log(`login message is ${loginDetails.message}`);
      // console.log(`user id is ${loginDetails.userId}`);
      console.log(`user token is ${loginDetails.token}`);
      window.location.href = "/";
    }
  }
}
