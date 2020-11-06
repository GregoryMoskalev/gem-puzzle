import Board from './Board.js';
import Timer from './Timer.js';

const board = new Board();
const timer = new Timer();

const menu = document.createElement('menu');

menu.innerHTML = `  
<div class="menu">
  <button class="new-game">New game</button>
  <button class="save">Save</button>
  <button class="load">Load</button>
  <div class="timer"><span>Timer:</span><span class="time">0:00</span></div>
  <div class="moves"><span>Moves:</span><span class="move">0</span></div>
  <label for="fieldSize">Field size:</label>
  <select id="fieldSize">
  <option value="3">3</option>
  <option selected="selected" value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  </select>
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
  const { history, size, boardTable, time, moves, zero } = JSON.parse(
    localStorage.getItem('gameSave')
  );
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
