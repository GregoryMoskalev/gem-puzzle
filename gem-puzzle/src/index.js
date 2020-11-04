import Board from './board.js';
// import Timer from './timer.js';

const board = new Board();

const header = document.createElement('header');

header.innerHTML = `  
<header class="header">
  <button class="new-game">New game</button>
  <div class="timer"><span>Timer:</span><span class="time">0</span></div>
  <div class="moves"><span>Moves:</span><span class="move">0</span></div>
</header>`;

document.body.appendChild(header);

board.init();

document.querySelector('.new-game').addEventListener('click', () => {
  board.init();
});
