export function countdown() {
  let seconds = 60;
  function tick() {
    const counter = document.getElementById("counter");
    seconds--;
    (<HTMLElement>counter).innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if( seconds > 0 ) {
      setTimeout(tick, 1000);
    } else {
      // alert("Время истекло");
      //TODO: add load to server and results
      const initialScreen = <HTMLElement>document.querySelector('.sprint-start-screen');
      const gameScreen = <HTMLElement>document.querySelector('.sprint-game-screen');
      // gameScreen.classList.add('hide');
      // initialScreen.classList.remove('hide');
    }
  }
  tick();
}