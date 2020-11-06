export default class Board {
  constructor() {
    this.history = [];
    this.size = 4;
    this.emptyX = 0;
    this.emptyY = 0;
    this.animationTime = 400;
    this.boardWidth = 40.8;
    this.marginSize = 0.1;
    this.removeBoard = () => {
      document.querySelectorAll('.board').forEach((elem) => {
        document.body.removeChild(elem);
      });
    };
  }

  move(direction) {
    switch (direction) {
      case 'up':
        this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX - 1][this.emptyY];
        this.arr[this.emptyX - 1][this.emptyY] = 0;
        this.emptyX -= 1;
        break;
      case 'down':
        this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX + 1][this.emptyY];
        this.arr[this.emptyX + 1][this.emptyY] = 0;
        this.emptyX += 1;
        break;
      case 'right':
        this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX][this.emptyY + 1];
        this.arr[this.emptyX][this.emptyY + 1] = 0;
        this.emptyY += 1;
        break;
      case 'left':
        this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX][this.emptyY - 1];
        this.arr[this.emptyX][this.emptyY - 1] = 0;
        this.emptyY -= 1;
        break;
      default:
        throw new Error('>:(');
    }
  }

  shuffle() {
    this.history.push([ this.emptyX, this.emptyY ]);

    for (let i = 0; i < this.size ** 3; i += 1) {
      switch (Math.floor(4 * Math.random())) {
        case 0:
          if (this.emptyX !== 0) {
            //  MOVE UP

            this.move('up');
          } else {
            //  MOVE DOWN
            this.move('down');
          }
          this.history.push([ this.emptyX, this.emptyY ]);
          break;
        case 1:
          if (this.emptyY !== this.size - 1) {
            //  MOVE RIGHT
            this.move('right');
          } else {
            //  MOVE LEFT
            this.move('left');
          }
          this.history.push([ this.emptyX, this.emptyY ]);
          break;
        case 2:
          if (this.emptyX !== this.size - 1) {
            //  MOVE DOWN
            this.move('down');
          } else {
            //  MOVE UP
            this.move('up');
          }
          this.history.push([ this.emptyX, this.emptyY ]);
          break;
        case 3:
          if (this.emptyY !== 0) {
            //  MOVE LEFT
            this.move('left');
          } else {
            //  MOVE RIGHT
            this.move('right');
            this.history.push([ this.emptyX, this.emptyY ]);
          }
          break;
        default:
          i -= 1;
          throw new Error('>:(');
      }
    }
  }

  renderBoard() {
    let board = '';
    const boardWidth = `${this.boardWidth}rem`;
    let cellNumber;

    for (let i = 0, order = 1; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        cellNumber = this.arr[i][j];
        const className = this.arr[i][j] ? 'cell' : 'cell empty';
        const draggable = !!this.arr[i][j];
        const bGpos = this.bgPosArr[cellNumber - 1];
        order += 1;

        board += `<div style='width:${this.cellSize}rem; height:${this
          .cellSize}rem; order:${order}; background-position: ${bGpos}; background-size: ${boardWidth};' id='cell-${cellNumber}' class='${className}' draggable="${draggable}">${cellNumber}</div>`;
      }
    }

    const element = document.createElement('div');
    element.classList.add('board');
    element.style.width = boardWidth;
    element.innerHTML = board;

    document.body.appendChild(element);
  }

  createBoard() {
    this.arr = [];
    this.bgPosArr = [];
    this.emptyX = this.size - 1;
    this.emptyY = this.size - 1;
    for (let i = 0; i < this.size; i += 1) {
      this.arr[i] = [];
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          this.arr[i][j] = i * this.size + j + 1;
          this.bgPosArr.push(
            `${Math.round(100 / (this.size - 1) * j)}% ${Math.round(100 / (this.size - 1) * i)}%`
          );
        } else {
          this.arr[i][j] = 0;
        }
      }
    }
  }

  draw() {
    const remPerTick = this.cellSize / this.animationTime * this.timePassed;
    switch (this.direction) {
      case 'up':
        this.e.style.transform = `translate( 0, ${-remPerTick}rem)`;
        break;
      case 'down':
        this.e.style.transform = `translate( 0, ${remPerTick}rem)`;
        break;
      case 'left':
        this.e.style.transform = `translate( ${-remPerTick}rem, 0)`;
        break;
      case 'right':
        this.e.style.transform = `translate( ${remPerTick}rem, 0)`;
        break;
      default:
        throw new Error('>:(');
    }
  }

  moveAnimation() {
    this.inAnimation = true;
    this.start = Date.now();

    this.timer = setInterval(() => {
      this.timePassed = Date.now() - this.start;

      if (this.timePassed >= this.animationTime) {
        clearInterval(this.timer);
        this.inAnimation = false;
        return;
      }

      this.draw();
    }, 20);
  }

  checkWin() {
    const win = [];
    for (let i = 0; i < this.size; i += 1) {
      win[i] = [];
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          win[i][j] = i * this.size + j + 1;
        } else {
          win[i][j] = 0;
        }
      }
    }

    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          if (win[i][j] !== this.arr[i][j]) return false;
        }
      }
    }

    return true;
  }

  swap(number) {
    if (this.inAnimation) return;

    for (let i = 0; i < this.arr.length; i += 1) {
      for (let j = 0; j < this.arr[i].length; j += 1) {
        if (this.arr[i][j] === number) {
          if (
            (Math.abs(this.emptyX - i) <= 1 && this.emptyY - j === 0) ||
            (Math.abs(this.emptyY - j) <= 1 && this.emptyX - i === 0)
          ) {
            // Move counter
            this.movesCounter += 1;
            document.querySelector('.move').innerHTML = this.movesCounter;

            const zero = document.querySelector(`#cell-${this.arr[this.emptyX][this.emptyY]}`);
            this.e = document.querySelector(`#cell-${this.arr[i][j]}`);

            //  find where are we moving
            if (this.emptyX - i < 0) {
              this.direction = 'up';
              this.moveAnimation();
            } else if (this.emptyX - i > 0) {
              this.direction = 'down';
              this.moveAnimation();
            } else if (this.emptyY - j < 0) {
              this.direction = 'left';
              this.moveAnimation();
            } else if (this.emptyY - j > 0) {
              this.direction = 'right';
              this.moveAnimation();
            }

            setTimeout(() => {
              const temp = zero.style.order;
              zero.style.order = this.e.style.order;
              this.e.style.order = temp;

              this.e.style.transform = '';

              if (this.emptyX === this.emptyY && this.emptyY === this.size - 1) {
                if (this.checkWin()) {
                  document.querySelector(
                    '.board'
                  ).innerHTML += `Ура! Вы решили головоломку за ${document.querySelector('.time')
                    .innerHTML} и ${document.querySelector('.move').innerHTML} ходов`;
                }
              }
            }, this.animationTime);

            [ this.arr[i][j], this.arr[this.emptyX][this.emptyY] ] = [
              this.arr[this.emptyX][this.emptyY],
              this.arr[i][j]
            ];
            this.emptyX = i;
            this.emptyY = j;
            return;
          }
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this

  init() {
    this.history = [];
    this.movesCounter = 0;
    document.querySelector('.move').innerHTML = this.movesCounter;
    this.size = document.getElementById('fieldSize').value;

    this.cellSize = parseFloat(this.boardWidth / this.size - 2 * this.marginSize).toFixed(3);

    this.removeBoard();
    this.createBoard();
    this.shuffle();
    this.renderBoard();

    document.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('mouseup', (evt) => {
        const elem = evt.target;
        this.swap(parseInt(elem.innerHTML, 10));
      });

      cell.addEventListener('dragstart', this.dragStart);

      cell.addEventListener('dragover', this.dragOver);

      cell.addEventListener('drop', this.dragDrop);

      cell.addEventListener('dragend', this.dragEnd);
    });
  }

  load() {
    document.querySelector('.move').innerHTML = this.movesCounter;
    this.removeBoard();
    this.renderBoard();

    document.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('mouseup', (evt) => {
        const elem = evt.target;
        this.swap(parseInt(elem.innerHTML, 10));
      });

      cell.addEventListener('dragstart', this.dragStart);

      cell.addEventListener('dragover', this.dragOver);

      cell.addEventListener('drop', this.dragDrop);

      cell.addEventListener('dragend', this.dragEnd);
    });
  }
}
