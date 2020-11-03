import Board from './board.js';

const board = new Board();
const element = document.createElement('div');
element.classList.add('board');

element.innerHTML = board.createBoard();

document.body.appendChild(element);

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mousedown', (evt) => {
    const elem = evt.target;
    board.swap(parseInt(elem.innerHTML, 10));
  });
});
