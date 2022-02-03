export function sound():void {
  const changeSoundBtn = document.querySelector("??") as HTMLElement;
  const audio = new Audio();
  
  /*function getValue(){
    let audio = `${???}`;
    // console.log(audio);
    return audio;
  }*/

  function playAudio() {
    audio.src = `${audio}`;
    audio.currentTime = 0;
    audio.play();
  }

  function pauseAudio() {
    audio.pause();
  }

  function changePlayBtn() {
    changeSoundBtn.classList.toggle('pause');
    changeSoundBtn.classList.toggle('play');
    if (changeSoundBtn.classList.contains('play')) {
      pauseAudio();
    } else {
     // getValue();
      playAudio();
    }
  }

  changeSoundBtn.addEventListener('click', changePlayBtn);
  
}  