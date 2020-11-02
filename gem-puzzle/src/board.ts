function createBoard(size: number = 4):any {
  const board = [];
  for(let i= 0; i< size; ++i){
    board[i]=[];
    for(let j = 0;j < size; ++j){
      if(i+j !== (size -1) * 2){
        board[i][j] = i*size + j + 1;
      } else {
        board[i][j]= 0;
      }
    }
  }

  return board;
};

export default createBoard;
