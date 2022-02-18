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
        
        window.location.hash = '/sprint';
        if (localStorage.getItem('currentPage')) {
          let levelparsed = JSON.parse((localStorage.getItem('currentPage') as string)).split('-')[0];
          level = parseInt(levelparsed.charAt(levelparsed.length - 1));
          if (level == 7) {
            level = 6;
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
    console.log('keyboard is clicked!');
    const levelsDiv = document.querySelector('.sprint-level-range');
    if (levelsDiv != null) {
      switch (e.key) {
        case ('1'): {          
          level = 0;
          await startSprintGame(level);
          break;
        }
        case ('2'): {
          level = 1;
          await startSprintGame(level);
          break;
        }
        case ('3'): {
          level = 2;
          await startSprintGame(level);
          break;
        }
        case ('4'): {
          level = 3;
          await startSprintGame(level);
          break;
        }
        case ('5'): {
          level = 4;
          await startSprintGame(level);
          break;
        }
        case ('6'): {
          level = 5;
          await startSprintGame(level);
          break;
        }        
      }             
    } 
  })  
}