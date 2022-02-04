import { loginUser } from "../js/api";

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
    eInput.onkeyup = () => { checkEmail(); } //calling checkEmail function on email input keyup
    pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

    function checkEmail () { //checkEmail function
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

    function checkPass () { //checkPass function
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
    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
      console.log(`action is ${form.getAttribute("action")}`);
      let user = { "email": eInput.value, "password": pInput.value};
      let loginDetails = await loginUser( user );
      console.log(`login message is ${loginDetails.message}`);
      console.log(`user id is ${loginDetails.userId}`);
      console.log(`user token is ${loginDetails.token}`);
      // window.location.href = form.getAttribute("action") || ''; //redirecting user to the specified url which is inside action attribute of form tag
    }
  }
}
