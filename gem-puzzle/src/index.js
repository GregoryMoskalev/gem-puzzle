import Board from './board.js';

const board = new Board();

const header = document.createElement('header');
header.classList.add('header');
header.innerHTML = '<h1 class="heading">gem puzzle</h1>';
document.body.appendChild(header);

const menu = document.createElement('div');
menu.classList.add('menu');

let loadBtnProperties = '';


if(!(localStorage.getItem('gameSave'))) {
  loadBtnProperties = `disabled title="Can't load game"`
}
menu.innerHTML = `  
  <div class="settings">
    <button class="new-game btn">New</button>
    <button class="save btn">Save</button>
    <button class="load btn" ${loadBtnProperties}>Load</button>
    <button class="score btn">Score</button>
    <button class="sound btn ${board.soundOn ? 'btn-on' : ''}">Sound</button>
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
    <button class="cheat btn">CHEAT</button>
  </div>
  <div class="counters">
    <div class="timer"><span>Timer: </span><span class="time">0:00</span></div>
    <div class="moves"><span>Moves: </span><span class="move">0</span></div>
  </div>`;

document.body.appendChild(menu);
const loadBtn = document.querySelector('.load');


board.init();

document.querySelector('.new-game').addEventListener('click', () => {
  board.init();
});

document.querySelector('.save').addEventListener('click', () => {
  loadBtn.disabled = false;
  loadBtn.title = '';
  localStorage.setItem(
    'gameSave',
    JSON.stringify({
      bgPosition: board.bgPosArr,
      history: board.history,
      size: board.size,
      boardTable: board.arr,
      time: board.timerC.currentTime,
      moves: board.movesCounter,
      zero: [ board.emptyX, board.emptyY ],
      imgNumb: board.imgNumb
    })
  );
});

loadBtn.addEventListener('click', () => {
  const { bgPosition, history, size, boardTable, time, moves, zero, imgNumb } = JSON.parse(
    localStorage.getItem('gameSave')
  );
  board.bgPosArr = bgPosition;
  board.history = history;
  board.size = size;
  board.timerC.currentTime = time;
  board.movesCounter = moves;
  board.arr = boardTable;
  [ board.emptyX, board.emptyY ] = zero;
  board.imgNumb = imgNumb;
  board.load();
  board.timerC.load();
});

document.getElementById('fieldSize').addEventListener('change', () => {
  board.init();
  board.timerC.init();
});

document.querySelector('.cheat').addEventListener('click', () => {
  board.timerC.timerPause();
  board.back();
});

document.querySelector('.sound').addEventListener('click', (evt) => {
  board.toggleSound();
  if (board.soundOn) {
    evt.target.classList.add('btn-on');
  } else {
    evt.target.classList.remove('btn-on');
  }
});

document.querySelector('.score').addEventListener('click', (evt) => {
  board.renderScoreList();
  if (board.isActiveScoreList) {
    evt.target.classList.add('btn-on');
  } else {
    evt.target.classList.remove('btn-on');
  }
});
