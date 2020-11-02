import {createBoard, history, swap} from './board';



(function() {
  const element:any = document.createElement('div');
  element.classList.add('board');

  
  element.innerHTML = createBoard();

  console.table(history);

  document.body.appendChild(element);
})();

document.querySelectorAll('.cell').forEach(cell =>{
  cell.addEventListener('mousedown', (evt) => {
    const elem = <HTMLElement>evt.target;

    swap(elem.innerHTML);
  });
})
