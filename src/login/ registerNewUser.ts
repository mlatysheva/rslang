import { renderUserName } from "../homePage/home";
import { createUser } from "../js/api";
import { setItemToLocalStorage } from "../js/localStorage";

export function registerUser() {
  console.log('we are in registerUser');
  const form = <HTMLElement>document.getElementById("signup-form");
  const nField = <HTMLElement>form.querySelector(".name");
  const nInput = <HTMLInputElement>nField.querySelector("input");
  const eField = <HTMLElement>form.querySelector(".email"); 
  const eInput = <HTMLInputElement>eField.querySelector("input");
  const pField = <HTMLElement>form.querySelector(".password");
  const pInput = <HTMLInputElement>pField.querySelector("input");

  form.onsubmit = async (e) => {
    e.preventDefault(); //preventing form from submitting
    console.log(`signup is clicked`);
    
    ((<HTMLInputElement>nInput).value == "") ? nField.classList.add("shake", "error") : checkName();
    ((<HTMLInputElement>eInput).value == "") ? eField.classList.add("shake", "error") : checkEmail();
    ((<HTMLInputElement>pInput).value == "") ? pField.classList.add("shake", "error") : checkPass();
    setTimeout(() => { 
      nField.classList.remove("shake");
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);
    nInput.onkeyup = () => { checkName(); } 
    eInput.onkeyup = () => { checkEmail(); } 
    pInput.onkeyup = () => { checkPass(); } 

    function checkName () { 
      let pattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/; 
      if (!nInput.value.match(pattern)) { 
        nField.classList.add("error");
        nField.classList.remove("valid");
        let errorTxt = <HTMLElement>nField.querySelector(".error-txt");
        (nInput.value != "") ? errorTxt.innerText = "Введите правильное имя" : errorTxt.innerText = "Имя не может быть пустым";
      } else { 
        nField.classList.remove("error");
        nField.classList.add("valid");
      }
    }

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

    function checkPass() { 
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
    
    if (!nField.classList.contains("error") && !eField.classList.contains("error") && !pField.classList.contains("error")) {
      console.log(`action is ${form.getAttribute("action")}`);
      let newUser = { "email": eInput.value, "password": pInput.value};
      let newUserdetails = await createUser( newUser );
      setItemToLocalStorage('name', nInput.value);
      setItemToLocalStorage('email', newUserdetails.email);
      setItemToLocalStorage('id', newUserdetails.id);
      const app = document.getElementById('app');
      (<HTMLElement>app).innerHTML='';
      (<HTMLElement>app).innerText = 'Вы успешно зарегистрированы!';
      renderUserName();
      // window.location.href = "/";
    }
  }
}
