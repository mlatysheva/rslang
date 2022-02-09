export function startSprintGame(level: number) {
  const initialScreen = <HTMLElement>document.querySelector('.sprint-start-screen');
  initialScreen?.classList.add('hide');

  const parentDiv = <HTMLElement>document.querySelector('.sprint-view');

  const gameScreen = document.createElement('div');
  gameScreen.classList.add('sprint-game-screen');

  function returnToSprint() {
    gameScreen.classList.add('hide');
    initialScreen.classList.remove('hide');
  }
  let html = `
    <div class="icon replay-button" title="К выбору уровня"></div>
    <div class="timer-wrapper">
      <div class="clock-image"></div>
      <div class="timer">60</div>
    </div>
    
    <div class="points"><span class="large-text">Очки: </span>20</div>
    <div class="question-wrapper">
      <span class="english-word">English word</span>
      <span class="is"> значит </span>
      <span class="translation">перевод</span>?
    </div>
    <div class="sprint-controls-wrapper">
      <div class="button sprint-answer-button sprint-correct">Верно</div>
      <div class="button sprint-answer-button sprint-incorrect">Неверно</div>
    </div>    
  `
  gameScreen.innerHTML = html;
  (<HTMLElement>parentDiv).appendChild(gameScreen);

  const replayBtn = gameScreen.querySelector('.replay-button');
  replayBtn?.addEventListener('click', () => {
      gameScreen.classList.add('hide');
      initialScreen.classList.remove('hide');
  })
}