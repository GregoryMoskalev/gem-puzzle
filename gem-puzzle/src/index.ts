import board from './board';

function component() {
  const element = document.createElement('div');
  element.classList.add('board');
  const arr = board()
  let size = 4;
  console.log(arr);
  
  for(let i = 0; i< size; i++){
    for(let j = 0; j < size; j++){
      element.innerHTML += `<div class='cell'>${arr[i][j]}</div>`;
    }
  }


  return element;
}

document.body.appendChild(component());
