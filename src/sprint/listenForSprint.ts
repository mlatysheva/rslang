import { startSprintGame } from "./sprintGame";
import { replay } from "./sprintUtils";

export function listenForSprint() {
  document.body.addEventListener('click', async (e) => {
    if (e.target) {

      let level: number;
      if ((e.target as HTMLElement).classList.contains('sprint-level')) {
        const element = <HTMLElement>e.target;
        level = parseInt((element.id.split('-')[1])); 
        await startSprintGame(level);    
      } 
      if ((e.target as HTMLElement).id == 'sprint') {
        
        window.location.hash = '#/sprint/';
        if (localStorage.getItem('currentPage')) {
          let levelparsed = JSON.parse((localStorage.getItem('currentPage') as string)).split('-')[0];
          level = parseInt(levelparsed.charAt(levelparsed.length - 1));
          if (level == 6) {
            level = 5;
          }
        } else {
          level = 0;
        }
        replay();
        await startSprintGame(level);
      }
    }
  })
}

export  function listenForSprintKeyboard() {
  let level: number;
  document.body.addEventListener('keyup', async (e) => {
    const levelsDiv = document.querySelector('.sprint-level-range');
    if (levelsDiv != null) {
      switch (e.key) {
        case ('1'): {          
          await startSprintGame(0);
          break;
        }
        case ('2'): {
          await startSprintGame(1);
          break;
        }
        case ('3'): {
          await startSprintGame(2);
          break;
        }
        case ('4'): {
          await startSprintGame(3);
          break;
        }
        case ('5'): {
          await startSprintGame(4);
          break;
        }
        case ('6'): {
          await startSprintGame(5);
          break;
        }        
      }             
    } 
  })  
}