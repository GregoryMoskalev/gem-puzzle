import Board from './Board.js';
import Timer from './Timer.js';

const board = new Board();
const timer = new Timer();

const header = document.createElement('header');

header.innerHTML = `  
<header class="header">
  <button class="new-game">New game</button>
  <div class="timer"><span>Timer:</span><span class="time">0:00</span></div>
  <div class="moves"><span>Moves:</span><span class="move">0</span></div>
</header>`;

document.body.appendChild(header);

board.init();
timer.init();

document.querySelector('.new-game').addEventListener('click', () => {
  board.init();
  timer.init();
});
