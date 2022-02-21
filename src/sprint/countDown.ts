export function countdown() {
  let seconds = 60;
  
  function tick() {
    const counter = document.getElementById("counter");
    if(!counter) {
      return false;
    }
    seconds--;
    (<HTMLElement>counter).innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    let interval;
    if (window.location.hash === "#/sprint/" || window.location.hash === "#/sprint" || window.location.hash === "/sprint") {
      
      if( seconds > 0) {
        interval = setTimeout(tick, 1000);
      } else {
        alert("Время истекло");
      }
    } else {
      clearTimeout(interval);
      return false;
    }
  }  
  tick();
}