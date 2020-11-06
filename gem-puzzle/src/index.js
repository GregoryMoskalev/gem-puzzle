import Board from './Board.js';
import Timer from './Timer.js';

const board = new Board();
const timer = new Timer();

const header = document.createElement('header');
header.classList.add('header');
header.innerHTML = '<h1 class="heading">gem puzzle</h1>';
document.body.appendChild(header);

const menu = document.createElement('div');
menu.classList.add('menu');

menu.innerHTML = `  
  <div class="settings">
    <button class="new-game btn">New</button>
    <button class="save btn">Save</button>
    <button class="load btn">Load</button>
    <div class="size">
      <select id="fieldSize">
      <option selected="selected" value="4" disabled>Field size</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
    </div>
  </div>
  <div class="counters">
    <div class="timer"><span>Timer:</span><span class="time">0:00</span></div>
    <div class="moves"><span>Moves:</span><span class="move">0</span></div>
  </div>`;

document.body.appendChild(menu);

board.init();
timer.init();

document.querySelector('.new-game').addEventListener('click', () => {
  board.init();
  timer.init();
});

document.querySelector('.save').addEventListener('click', () => {
  localStorage.setItem(
    'gameSave',
    JSON.stringify({
      bgPosition: board.bgPosArr,
      history: board.history,
      size: board.size,
      boardTable: board.arr,
      time: timer.currentTime,
      moves: board.movesCounter,
      zero: [ board.emptyX, board.emptyY ]
    })
  );
});

document.querySelector('.load').addEventListener('click', () => {
  const { bgPosition, history, size, boardTable, time, moves, zero } = JSON.parse(
    localStorage.getItem('gameSave')
  );
  board.bgPosArr = bgPosition;
  board.history = history;
  board.size = size;
  timer.currentTime = time;
  board.movesCounter = moves;
  board.arr = boardTable;
  board.load();
  timer.load();
  [ board.emptyX, board.emptyY ] = zero;
});

document.getElementById('fieldSize').addEventListener('change', () => {
  board.init();
  timer.init();
});
