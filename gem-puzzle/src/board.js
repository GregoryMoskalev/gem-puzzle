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
    this.winSound = new Audio('./assets/win.mp3');
    this.slideSound = new Audio('./assets/slide.mp3');
    this.slideSound.volume = 0.2;
    this.dragNDropSound = new Audio('./assets/whoosh-grainy_gkoaqyn_.mp3');
    this.dragNDropSound.volume = 0.3;
    this.removeBoard = () => {
      document.querySelectorAll('.board').forEach((elem) => {
        document.body.removeChild(elem);
      });
    };
    this.findElem = (elem) => {
      for (let x = 0; x < this.arr.length; x += 1) {
        for (let y = 0; y < this.arr.length; y += 1) {
          if (this.arr[x][y] === parseInt(elem.innerHTML, 10)) return [ x, y ];
        }
      }
      throw new Error(elem);
    };
    this.dragDrop = (e) => {
      const zero = e.target;
      const moveable = document.querySelector('.hide');
      const [ x, y ] = this.findElem(moveable);
      if (this.isNearZero(x, y)) {
        [ this.arr[x][y], this.arr[this.emptyX][this.emptyY] ] = [
          this.arr[this.emptyX][this.emptyY],
          this.arr[x][y]
        ];
        [ this.emptyX, this.emptyY ] = [ x, y ];
        [ zero.style.order, moveable.style.order ] = [ moveable.style.order, zero.style.order ];
        this.checkForIdling();
        this.history.push([ this.emptyX, this.emptyY ]);
        this.playDragSound();
        this.addMove();
      }
      zero.classList.remove('hovered');
    };
    this.toggleButtons = () => {
      document.querySelectorAll('.btn:not(.sound),#fieldSize').forEach((e) => {
        e.disabled = !e.disabled;
      });
    };
  }

  randomImgNumber(max, min) {
    this.imgNumb = Math.floor(Math.random() * (max - min) + min);
  }

  back() {
    this.toggleButtons();
    this.history.pop();
    this.backTimer();
  }

  isNearZero(x, y) {
    return (
      (Math.abs(this.emptyX - x) === 1 && this.emptyY - y === 0) ||
      (Math.abs(this.emptyY - y) === 1 && this.emptyX - x === 0)
    );
  }

  checkForIdling() {
    const [ blX, blY ] = this.history[this.history.length - 2];
    if (this.emptyX === blX && this.emptyY === blY) {
      this.history.splice(-2, 2);
    }
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
      } else {
        this.checkWin(true);
        this.toggleButtons();
      }
    }, this.animationTime);
  }

  move(direction) {
    switch (direction) {
      case 'up':
        if (
          this.emptyX !== 0 &&
          (this.history.length <= 1 || this.emptyX - 1 !== this.history[this.history.length - 2][0])
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
          (this.history.length <= 1 || this.emptyX + 1 !== this.history[this.history.length - 2][0])
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
          (this.history.length <= 1 || this.emptyY + 1 !== this.history[this.history.length - 2][1])
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
          (this.history.length <= 1 || this.emptyY - 1 !== this.history[this.history.length - 2][1])
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
    let board = `<div class="score-list">test</div>`;
    const boardWidth = `${this.boardWidth}rem`;
    let cellNumber;

    for (let i = 0, order = 1; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        cellNumber = this.arr[i][j];

        const className = cellNumber ? 'cell' : 'cell empty';

        const draggable = !!cellNumber;

        const preventDef = !cellNumber ? "ondragover = 'event.preventDefault()'" : '';
        const bGpos = this.bgPosArr[cellNumber - 1];
        const bgForCell = cellNumber
          ? `background: url(./assets/images/${this
              .imgNumb}.jpg); background-position: ${bGpos}; background-size: ${boardWidth};`
          : '';
        order += 1;

        board += `<div 
        ${preventDef}
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

  addMove() {
    this.movesCounter += 1;
    document.querySelector('.move').innerHTML = this.movesCounter;
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
          if (this.isNearZero(i, j)) {
            // Move counter
            this.addMove();

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
                }
              }
            }, this.animationTime);
            [ this.arr[i][j], this.arr[this.emptyX][this.emptyY] ] = [
              this.arr[this.emptyX][this.emptyY],
              this.arr[i][j]
            ];
            this.emptyX = i;
            this.emptyY = j;

            this.checkForIdling();
            this.history.push([ this.emptyX, this.emptyY ]);
            return;
          }
        }
      }
    }
  }

  setScore() {
    let scoreList = JSON.parse(localStorage.getItem('score-list')) || [];
    scoreList.push({ moves: this.movesCounter, size: this.size, time: this.timerC.timer });
    scoreList.sort((a, b) => {
      return a.moves - b.moves;
    });
    scoreList = scoreList.slice(0, 10);

    localStorage.setItem('score-list', JSON.stringify(scoreList));
  }

  getScoreList() {
    this.scoreList = !this.scoreList;

    const scoreElem = document.querySelector('.score-list');
    const scoreList = JSON.parse(localStorage.getItem('score-list')) || [];
    let list = '';

    for (let i = 0; i < scoreList.length; i += 1) {
      list += `<li>Size: ${scoreList[i].size},&nbsp;&nbsp;&nbsp;&nbsp;Moves: ${scoreList[i]
        .moves},&nbsp;&nbsp;&nbsp;&nbsp;Time: ${scoreList[i].time}</li>`;
    }
    scoreElem.innerHTML = `<h2>Best Scores</h2>
      <ol class="score">${list}</ol>`;
    if (this.scoreList) {
      scoreElem.classList.add('score-list-on');
      this.timerC.timerPause();
    } else {
      scoreElem.classList.remove('score-list-on');
      this.timerC.calcCurrentTime();
    }
  }

  checkWin(cheat) {
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        if (i + j !== (this.size - 1) * 2) {
          if (this.win[i][j] !== this.arr[i][j]) return false;
        }
      }
    }
    this.playWinSound();
    this.setWinMessage(cheat);
    if (!cheat) {
      this.setScore();
    }
    return true;
  }

  setWinMessage(cheat) {
    this.winBoard = document.querySelector('.board');
    this.winBoard.classList.add('win');

    this.winBoard.innerHTML += `<div style="background-image: url(./assets/images/${this
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

  playDragSound() {
    if (!this.soundOn) return;
    this.dragNDropSound.currentTime = 0.15;
    this.dragNDropSound.play();
  }

  dragStart() {
    setTimeout(() => {
      this.classList.add('hide');
    }, 0);
  }

  dragEnd() {
    this.classList.remove('hide');
  }

  dragEnter() {
    this.classList.add('hovered');
  }

  dragLeave() {
    this.classList.remove('hovered');
  }

  init() {
    this.scoreList = false;
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

      cell.addEventListener('dragenter', this.dragEnter);

      cell.addEventListener('dragleave', this.dragLeave);
    });
  }

  load() {
    this.cellSize = parseFloat(this.boardWidth / this.size - 2 * this.marginSize).toFixed(3);
    document.querySelector('.move').innerHTML = this.movesCounter;
    this.removeBoard();
    this.renderBoard();
    this.win = this.createBoard();
    this.timerC.load();

    document.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('mouseup', (evt) => {
        const elem = evt.target;
        this.swap(parseInt(elem.innerHTML, 10));
      });

      cell.addEventListener('dragstart', this.dragStart);

      cell.addEventListener('dragover', this.dragOver);

      cell.addEventListener('drop', this.dragDrop);

      cell.addEventListener('dragend', this.dragEnd);

      cell.addEventListener('dragenter', this.dragEnter);

      cell.addEventListener('dragleave', this.dragLeave);
    });
  }
}
