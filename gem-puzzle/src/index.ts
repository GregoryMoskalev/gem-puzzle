import board from './board';

function component() {
  const element = document.createElement('div');
  element.classList.add('board');

  
  element.innerHTML = board();


  return element;
}

document.body.appendChild(component());
