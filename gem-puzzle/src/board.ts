
function shuffle(arr:number[][], size: number = 4):number[][]{
  let emptyX = size -1;
  let emptyY = size -1;
  const history = [[emptyX, emptyY]];

  for(let i = 0; i < 80; i++){
    switch(Math.floor(4 * Math.random())){
      case 0: if(emptyX != 0) {  
        //MOVE UP

        arr[emptyX][emptyY] = arr[emptyX - 1][emptyY];
        arr[emptyX - 1][emptyY] = 0;
        emptyX = emptyX - 1;
        history.push([emptyX, emptyY])
      } else {
        //MOVE DOWN
        arr[emptyX][emptyY] = arr[emptyX + 1][emptyY];
        arr[emptyX + 1][emptyY] = 0;
        emptyX = emptyX + 1;
        history.push([emptyX, emptyY])
      }
      break;
			case 1: if(emptyY != size - 1) {
        //MOVE RIGHT
        arr[emptyX][emptyY] = arr[emptyX][emptyY + 1];
        arr[emptyX][emptyY + 1] = 0;
        emptyY = emptyY + 1;
        history.push([emptyX, emptyY])
      } else {
        //MOVE LEFT
        arr[emptyX][emptyY] = arr[emptyX][emptyY - 1];
        arr[emptyX][emptyY - 1] = 0;
        emptyY = emptyY - 1;
        history.push([emptyX, emptyY])
      }
      break; 
			case 2: if(emptyX != size - 1) {
        //MOVE DOWN
        arr[emptyX][emptyY] = arr[emptyX + 1][emptyY];
        arr[emptyX + 1][emptyY] = 0;
        emptyX = emptyX + 1;
        history.push([emptyX, emptyY])
      } else {
        //MOVE UP
        arr[emptyX][emptyY] = arr[emptyX - 1][emptyY];
        arr[emptyX - 1][emptyY] = 0;
        emptyX = emptyX - 1;
        history.push([emptyX, emptyY])
      }
      break; 
			case 3: if(emptyY != 0) {
        //MOVE LEFT
        history.push([emptyX, emptyY])
        arr[emptyX][emptyY] = arr[emptyX][emptyY - 1];
        arr[emptyX][emptyY - 1] = 0;
        emptyY = emptyY - 1;

      } else {
        //MOVE RIGHT
        history.push([emptyX, emptyY])
        arr[emptyX][emptyY] = arr[emptyX][emptyY + 1];
        arr[emptyX][emptyY + 1] = 0;
        emptyY = emptyY + 1;
      }
      break;
      default:
        
        console.log('>:(');
        i--;
    }
    
  
  }
  
  console.table(history);
  return arr;
}

function createBoard(size: number = 4):string {
  let arr = [];
  let board ='';
  let cellNumber: number;
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
  console.log(arr)

  for(let i = 0; i< size; i++){
    for(let j = 0; j < size; j++){
      cellNumber = arr[i][j];

        board += `<div id='cell-${cellNumber}' class='cell'>${cellNumber}</div>`;
      


    }
  }
  return board;
};

export default createBoard;
