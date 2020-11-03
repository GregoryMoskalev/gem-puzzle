import { createBoard, history, swap } from './board.js';

(function component() {
  const element = document.createElement('div');
  element.classList.add('board');

  element.innerHTML = createBoard();

  console.table(history);

  document.body.appendChild(element);
})();

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mousedown', (evt) => {
    const elem = evt.target;
    const gem = elem.innerHTML;
    const cellNumber = parseInt(gem, 10);
    swap(cellNumber);
  });
});
