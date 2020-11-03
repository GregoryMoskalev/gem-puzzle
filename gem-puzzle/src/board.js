const history = [];
// let size = 4;
let emptyX;
let emptyY;
let arr = [];

function move(direction) {
  switch (direction) {
    case 'up':
      arr[emptyX][emptyY] = arr[emptyX - 1][emptyY];
      arr[emptyX - 1][emptyY] = 0;
      emptyX -= 1;
      break;
    case 'down':
      arr[emptyX][emptyY] = arr[emptyX + 1][emptyY];
      arr[emptyX + 1][emptyY] = 0;
      emptyX += 1;
      break;
    case 'right':
      arr[emptyX][emptyY] = arr[emptyX][emptyY + 1];
      arr[emptyX][emptyY + 1] = 0;
      emptyY += 1;
      break;
    case 'left':
      arr[emptyX][emptyY] = arr[emptyX][emptyY - 1];
      arr[emptyX][emptyY - 1] = 0;
      emptyY -= 1;
      break;
    default:
      throw new Error('>:(');
  }
}

function shuffle(size = 4) {
  emptyX = size - 1;
  emptyY = size - 1;
  history.push([ emptyX, emptyY ]);

  for (let i = 0; i < 80; i += 1) {
    switch (Math.floor(4 * Math.random())) {
      case 0:
        if (emptyX !== 0) {
          //  MOVE UP

          move('up');
        } else {
          //  MOVE DOWN
          move('down');
        }
        history.push([ emptyX, emptyY ]);
        break;
      case 1:
        if (emptyY !== size - 1) {
          //  MOVE RIGHT
          move('right');
        } else {
          //  MOVE LEFT
          move('left');
        }
        history.push([ emptyX, emptyY ]);
        break;
      case 2:
        if (emptyX !== size - 1) {
          //  MOVE DOWN
          move('down');
        } else {
          //  MOVE UP
          move('up');
        }
        history.push([ emptyX, emptyY ]);
        break;
      case 3:
        if (emptyY !== 0) {
          //  MOVE LEFT
          move('left');
        } else {
          //  MOVE RIGHT
          move('right');
          history.push([ emptyX, emptyY ]);
        }
        break;
      default:
        i -= 1;
        throw new Error('>:(');
    }
  }

  return arr;
}

function renderBoard(size = 4) {
  let board = '';
  let cellNumber;

  for (let i = 0, order = 1; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      cellNumber = arr[i][j];
      const className = arr[i][j] ? 'cell' : 'empty';
      order += 1;
      board += `<div style='order:${order};' id='cell-${cellNumber}' class='${className}'>${cellNumber}</div>`;
    }
  }

  return board;
}

function createBoard(size = 4) {
  for (let i = 0; i < size; i += 1) {
    arr[i] = [];
    for (let j = 0; j < size; j += 1) {
      if (i + j !== (size - 1) * 2) {
        arr[i][j] = i * size + j + 1;
      } else {
        arr[i][j] = 0;
      }
    }
  }

  arr = shuffle();
  console.log(arr);

  return renderBoard();
}

function swap(number) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j] === number) {
        if (
          (Math.abs(emptyX - i) <= 1 && emptyY - j === 0) ||
          (Math.abs(emptyY - j) <= 1 && emptyX - i === 0)
        ) {
          const zero = document.querySelector(`#cell-${arr[emptyX][emptyY]}`);
          const e = document.querySelector(`#cell-${arr[i][j]}`);
          const temp = zero.style.order;
          zero.style.order = e.style.order;
          e.style.order = temp;

          [ arr[i][j], arr[emptyX][emptyY] ] = [ arr[emptyX][emptyY], arr[i][j] ];
          emptyX = i;
          emptyY = j;
          return;
        }
      }
    }
  }
}

export { createBoard, history, swap };
