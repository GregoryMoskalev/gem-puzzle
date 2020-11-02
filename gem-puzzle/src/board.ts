let history: number[][] = [];
// let size = 4;
let emptyX:number;
let emptyY:number;
let arr:number[][] = [];

function move(direction:string){
  switch(direction){
    case'up':
      arr[emptyX][emptyY] = arr[emptyX - 1][emptyY];
      arr[emptyX - 1][emptyY] = 0;
      emptyX = emptyX - 1;
    break;
    case 'down':
      arr[emptyX][emptyY] = arr[emptyX + 1][emptyY];
      arr[emptyX + 1][emptyY] = 0;
      emptyX = emptyX + 1;
    break;
    case 'right':
      arr[emptyX][emptyY] = arr[emptyX][emptyY + 1];
      arr[emptyX][emptyY + 1] = 0;
      emptyY = emptyY + 1;
    break;
    case 'left':
      arr[emptyX][emptyY] = arr[emptyX][emptyY - 1];
      arr[emptyX][emptyY - 1] = 0;
      emptyY = emptyY - 1;
    break;
  }

}

function shuffle(arr:number[][], size: number = 4):number[][]{
  emptyX = size -1;
  emptyY = size -1;
  history.push([emptyX, emptyY]);

  for(let i = 0; i < 80; i++){
    switch(Math.floor(4 * Math.random())){
      case 0: if(emptyX != 0) {  
        //MOVE UP

        move('up');
      } else {
        //MOVE DOWN
        move('down');
      }
      history.push([emptyX, emptyY])
      break;
			case 1: if(emptyY != size - 1) {
        //MOVE RIGHT
        move('right');
      } else {
        //MOVE LEFT
        move('left');
      }
      history.push([emptyX, emptyY])
      break; 
			case 2: if(emptyX != size - 1) {
        //MOVE DOWN
        move('down');
      } else {
        //MOVE UP
        move('up');
      }
      history.push([emptyX, emptyY])
      break; 
			case 3: if(emptyY != 0) {
        //MOVE LEFT
        move('left');
      } else {
        //MOVE RIGHT
        move('right');
      history.push([emptyX, emptyY])
      }
      break;
      default:
        i--;
        throw new Error('>:(');

    }
    
  
  }
  

  return arr;
}

function createBoard(size: number = 4):string {


  for(let i= 0; i< size; ++i){
    arr[i]=[];
    for(let j = 0;j < size; ++j){
      if(i+j !== (size -1) * 2){
        arr[i][j] = i*size + j + 1;
      } else {
        arr[i][j]= 0;
      }
    }
  }

  arr = shuffle(arr);
  console.log(arr);




  return renderBoard();
};

function renderBoard( size: number = 4){
  let board ='';
  let cellNumber: number;

  for(let i = 0, order = 0; i< size; i++){
    for(let j = 0; j < size; j++){
      cellNumber = arr[i][j];
      let className = arr[i][j] ? 'cell' : 'empty';

      board += `<div style='order:${order++};' id='cell-${cellNumber}' class='${className}'>${cellNumber}</div>`;
      


    }
  }


  return board
}



function swap(number:any){
  console.log('in swap');
  number = parseInt(number);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <arr[i].length; j++){
      
      if(arr[i][j]===number){
        console.log(arr[i][j], arr[emptyX][emptyY]);
        if(Math.abs(emptyX - i) <= 1 && emptyY - j === 0 || Math.abs(emptyY - j) <= 1 && emptyX - i ===0) {

          // let zero = <HTMLElement>document.querySelector(`#cell-${arr[emptyX][emptyY]}`);
          // let e = <HTMLElement>document.querySelector(`#cell-${arr[i][j]}`);
          // let temp = zero.style.order;
          // zero.style.order = e.style.order;
          // e.style.order = temp;
          // zero.style.order = arr[i][j].toString();
          // e.style.order = arr[emptyX][emptyY].toString();

          [arr[i][j], arr[emptyX][emptyY]] = [arr[emptyX][emptyY], arr[i][j]];
          emptyX = i;
          emptyY = j;
          console.log(arr);
          



        }
      }
    }
  }
}


export  {createBoard, history, swap};

