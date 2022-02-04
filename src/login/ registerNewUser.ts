import { createUser } from "../js/api";

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
    e.preventDefault(); //preventing from form submitting
    console.log(`signup is clicked`);
    //if email and password is blank then add shake class in it else call specified function
    ((<HTMLInputElement>nInput).value == "") ? nField.classList.add("shake", "error") : checkName();
    ((<HTMLInputElement>eInput).value == "") ? eField.classList.add("shake", "error") : checkEmail();
    ((<HTMLInputElement>pInput).value == "") ? pField.classList.add("shake", "error") : checkPass();
    setTimeout(() => { //remove shake class after 500ms
      nField.classList.remove("shake");
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);
    nInput.onkeyup = () => { checkName(); } //calling checkEmail function on email input keyup
    eInput.onkeyup = () => { checkEmail(); } //calling checkEmail function on email input keyup
    pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

    function checkName () { 
      let pattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/; //pattern to validate name
      if (!nInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
        nField.classList.add("error");
        nField.classList.remove("valid");
        let errorTxt = <HTMLElement>nField.querySelector(".error-txt");
        //if email value is not empty then show please enter valid email else show Email can't be blank
        (nInput.value != "") ? errorTxt.innerText = "Введите правильное имя" : errorTxt.innerText = "Имя не может быть пустым";
      } else { //if pattern matched then remove error and add valid class
        nField.classList.remove("error");
        nField.classList.add("valid");
      }
    }

    function checkEmail () { 
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
      if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = <HTMLElement>eField.querySelector(".error-txt");
        //if email value is not empty then show please enter valid email else show Email can't be blank
        (eInput.value != "") ? errorTxt.innerText = "Введите правильный Email" : errorTxt.innerText = "Email не может быть пустым";
      } else { //if pattern matched then remove error and add valid class
        eField.classList.remove("error");
        eField.classList.add("valid");
      }
    }

    function checkPass() { 
      if (pInput.value == "" || pInput.value.length < 8) { //if pass is empty then add error and remove valid class
        pField.classList.add("error");
        pField.classList.remove("valid");
        let errorTxt = <HTMLElement>eField.querySelector(".error-txt");
        errorTxt.innerText = "Пароль должен содержать не менее 8 символов";
      } else { //if pass is empty then remove error and add valid class
        pField.classList.remove("error");
        pField.classList.add("valid");
      }
    }
    
    //if eField and pField doesn't contains error class that mean user filled details properly
    if (!nField.classList.contains("error") && !eField.classList.contains("error") && !pField.classList.contains("error")) {
      console.log(`action is ${form.getAttribute("action")}`);
      let newUser = { "email": eInput.value, "password": pInput.value};
      let newUserdetails = await createUser( newUser );
      console.log(`newUser email is ${newUserdetails.email}`);
      console.log(`New user id is: ${newUserdetails.id}`)
      // window.location.href = form.getAttribute("action") || ''; //redirecting user to the specified url which is inside action attribute of form tag
    }
  }
}
