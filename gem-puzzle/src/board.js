import Timer from './Timer.js';

export default class Board {
  constructor() {
    this.timerC = new Timer();
    this.history = [];
    this.size = 4;
    this.emptyX = 0;
    this.emptyY = 0;
    this.animationTime = 200;

    this.boardWidth = 40.8;
    this.marginSize = 0.1;
    this.soundOn = true;
    this.winSound = new Audio('../assets/win.mp3');
    this.slideSound = new Audio('../assets/slide.mp3');
    this.slideSound.volume = 0.2;
    this.removeBoard = () => {
      document.querySelectorAll('.board').forEach((elem) => {
        document.body.removeChild(elem);
      });
    };
  }

  randomImgNumber(max, min) {
    this.imgNumb = Math.floor(Math.random() * (max - min) + min);
  }

  back() {
    this.history.pop();
    this.backTimer();
  }

  backTimer() {
    setTimeout(() => {
      if (this.history.length) {
        const [ x, y ] = this.history.pop();
        this.e = document.querySelector(`#cell-${this.arr[x][y]}`);

        this.moveAnimation([ x, y ]);

        setTimeout(() => {
          const temp = this.arr[this.emptyX][this.emptyY];
          this.arr[this.emptyX][this.emptyY] = this.arr[x][y];
          this.arr[x][y] = temp;
          this.emptyX = x;
          this.emptyY = y;
          this.removeBoard();
          this.renderBoard();
          this.playSlideSound();
          this.backTimer();
        }, this.animationTime);
      } else if (this.checkWin()) {
        this.setWinMessage(true);
        this.playWinSound();
      }
    }, this.animationTime);
  }

  move(direction) {
    switch (direction) {
      case 'up':
        if (
          this.emptyX !== 0 &&
          (this.history.length <= 2 || this.emptyX - 1 !== this.history[this.history.length - 2][0])
        ) {
          this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX - 1][this.emptyY];
          this.arr[this.emptyX - 1][this.emptyY] = 0;
          this.emptyX -= 1;
          this.history.push([ this.emptyX, this.emptyY ]);
        } else {
          this.counter -= 1;
        }

        break;
      case 'down':
        if (
          this.emptyX !== this.size - 1 &&
          (this.history.length <= 2 || this.emptyX + 1 !== this.history[this.history.length - 2][0])
        ) {
          this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX + 1][this.emptyY];
          this.arr[this.emptyX + 1][this.emptyY] = 0;
          this.emptyX += 1;
          this.history.push([ this.emptyX, this.emptyY ]);
        } else {
          this.counter -= 1;
        }
        break;
      case 'right':
        if (
          this.emptyY !== this.size - 1 &&
          (this.history.length <= 2 || this.emptyY + 1 !== this.history[this.history.length - 2][1])
        ) {
          this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX][this.emptyY + 1];
          this.arr[this.emptyX][this.emptyY + 1] = 0;
          this.emptyY += 1;
          this.history.push([ this.emptyX, this.emptyY ]);
        } else {
          this.counter -= 1;
        }
        break;
      case 'left':
        if (
          this.emptyY !== 0 &&
          (this.history.length <= 2 || this.emptyY - 1 !== this.history[this.history.length - 2][1])
        ) {
          this.arr[this.emptyX][this.emptyY] = this.arr[this.emptyX][this.emptyY - 1];
          this.arr[this.emptyX][this.emptyY - 1] = 0;
          this.emptyY -= 1;
          this.history.push([ this.emptyX, this.emptyY ]);
        } else {
          this.counter -= 1;
        }
        break;
      default:
        throw new Error('>:(');
    }
  }

  createBoard() {
    const arr = [];

    this.bgPosArr = [];
    for (let i = 0; i < this.size; i += 1) {
      arr[i] = [];
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          arr[i][j] = i * this.size + j + 1;
          this.bgPosArr.push(
            `${Math.round(100 / (this.size - 1) * j)}% ${Math.round(100 / (this.size - 1) * i)}%`
          );
        } else {
          arr[i][j] = 0;
        }
      }
    }
    return arr;
  }

  shuffle() {
    this.history.push([ this.emptyX, this.emptyY ]);
    for (this.counter = 0; this.counter < this.size ** 3; this.counter += 1) {
      switch (Math.floor(4 * Math.random())) {
        case 0:
          //  MOVE UP

          this.move('up');

          break;
        case 1:
          //  MOVE RIGHT
          this.move('right');

          break;
        case 2:
          //  MOVE DOWN
          this.move('down');

          break;
        case 3:
          //  MOVE LEFT
          this.move('left');

          break;
        default:
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
        const bgForCell = this.arr[i][j]
          ? `background: url(../assets/images/${this
              .imgNumb}.jpg); background-position: ${bGpos}; background-size: ${boardWidth};`
          : '';
        order += 1;

        board += `<div 
          style='width:${this.cellSize}rem;
          height:${this.cellSize}rem;
          order:${order};
          ${bgForCell}'
          id='cell-${cellNumber}'
          class='${className}'
          draggable="${draggable}">${cellNumber}</div>`;
      }
    }

    const element = document.createElement('div');
    element.classList.add('board');
    element.style.width = boardWidth;
    element.innerHTML = board;

    document.body.appendChild(element);
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

  moveAnimation([ x, y ]) {
    if (this.emptyX < x) {
      this.direction = 'up';
    } else if (this.emptyX > x) {
      this.direction = 'down';
    } else if (this.emptyY < y) {
      this.direction = 'left';
    } else if (this.emptyY > y) {
      this.direction = 'right';
    }

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

  toggleSound() {
    this.soundOn = !this.soundOn;
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
            this.moveAnimation([ i, j ]);

            this.playSlideSound();

            setTimeout(() => {
              const temp = zero.style.order;
              zero.style.order = this.e.style.order;
              this.e.style.order = temp;

              this.e.style.transform = '';

              if (this.emptyX === this.emptyY && this.emptyY === this.size - 1) {
                if (this.checkWin()) {
                  this.timerC.timerPause();
                  this.setWinMessage();
                  this.playWinSound();
                }
              }
            }, this.animationTime);
            [ this.arr[i][j], this.arr[this.emptyX][this.emptyY] ] = [
              this.arr[this.emptyX][this.emptyY],
              this.arr[i][j]
            ];
            this.emptyX = i;
            this.emptyY = j;

            this.history.push([ this.emptyX, this.emptyY ]);
            return;
          }
        }
      }
    }
  }

  checkWin() {
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          if (this.win[i][j] !== this.arr[i][j]) return false;
        }
      }
    }

    return true;
  }

  setWinMessage(cheat) {
    this.winBoard = document.querySelector('.board');
    this.winBoard.classList.add('win');

    this.winBoard.innerHTML += `<div style="background-image: url(../assets/images/${this
      .imgNumb}.jpg);" class='win-text'>${cheat
      ? 'ЧИТЕР!'
      : `Ура! Вы решили головоломку за ${document.querySelector('.time')
          .innerHTML} и ${document.querySelector('.move').innerHTML} ходов</div>`}</div>`;
    setTimeout(() => {
      this.winBoard.querySelector('.win-text').style.opacity = 1;
    }, 50);
  }

  playWinSound() {
    if (!this.soundOn) return;
    this.winSound.currentTime = 0;
    this.winSound.play();
  }

  playSlideSound() {
    if (!this.soundOn) return;
    this.slideSound.currentTime = 0;
    this.slideSound.play();
  }

  init() {
    this.randomImgNumber(150, 1);
    this.history = [];
    this.movesCounter = 0;
    document.querySelector('.move').innerHTML = this.movesCounter;
    this.size = document.getElementById('fieldSize').value;

    this.cellSize = parseFloat(this.boardWidth / this.size - 2 * this.marginSize).toFixed(3);

    this.removeBoard();

    this.emptyX = this.size - 1;
    this.emptyY = this.size - 1;

    this.arr = this.createBoard();
    this.win = this.createBoard();

    this.shuffle();

    this.renderBoard();
    this.timerC.init();

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
    this.cellSize = parseFloat(this.boardWidth / this.size - 2 * this.marginSize).toFixed(3);
    document.querySelector('.move').innerHTML = this.movesCounter;
    this.removeBoard();
    this.renderBoard();
    this.win = this.createBoard();
    this.timerC.init();

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
