(()=>{"use strict";const t=new class{constructor(){this.history=[],this.size=4,this.emptyX=0,this.emptyY=0,this.animationTime=400,this.boardWidth=40.8,this.marginSize=.1,this.removeBoard=()=>{document.querySelectorAll(".board").forEach((t=>{document.body.removeChild(t)}))}}move(t){switch(t){case"up":this.arr[this.emptyX][this.emptyY]=this.arr[this.emptyX-1][this.emptyY],this.arr[this.emptyX-1][this.emptyY]=0,this.emptyX-=1;break;case"down":this.arr[this.emptyX][this.emptyY]=this.arr[this.emptyX+1][this.emptyY],this.arr[this.emptyX+1][this.emptyY]=0,this.emptyX+=1;break;case"right":this.arr[this.emptyX][this.emptyY]=this.arr[this.emptyX][this.emptyY+1],this.arr[this.emptyX][this.emptyY+1]=0,this.emptyY+=1;break;case"left":this.arr[this.emptyX][this.emptyY]=this.arr[this.emptyX][this.emptyY-1],this.arr[this.emptyX][this.emptyY-1]=0,this.emptyY-=1;break;default:throw new Error(">:(")}}shuffle(){this.history.push([this.emptyX,this.emptyY]);for(let t=0;t<this.size**3;t+=1)switch(Math.floor(4*Math.random())){case 0:0!==this.emptyX?this.move("up"):this.move("down"),this.history.push([this.emptyX,this.emptyY]);break;case 1:this.emptyY!==this.size-1?this.move("right"):this.move("left"),this.history.push([this.emptyX,this.emptyY]);break;case 2:this.emptyX!==this.size-1?this.move("down"):this.move("up"),this.history.push([this.emptyX,this.emptyY]);break;case 3:0!==this.emptyY?this.move("left"):(this.move("right"),this.history.push([this.emptyX,this.emptyY]));break;default:throw t-=1,new Error(">:(")}}renderBoard(){let t="";const e=this.boardWidth+"rem";let i;for(let s=0,r=1;s<this.size;s+=1)for(let h=0;h<this.size;h+=1){i=this.arr[s][h];const n=this.arr[s][h]?"cell":"cell empty",o=!!this.arr[s][h],a=this.bgPosArr[i-1];r+=1,t+=`<div style='width:${this.cellSize}rem; height:${this.cellSize}rem; order:${r}; background-position: ${a}; background-size: ${e};' id='cell-${i}' class='${n}' draggable="${o}">${i}</div>`}const s=document.createElement("div");s.classList.add("board"),s.style.width=e,s.innerHTML=t,document.body.appendChild(s)}createBoard(){this.arr=[],this.bgPosArr=[],this.emptyX=this.size-1,this.emptyY=this.size-1;for(let t=0;t<this.size;t+=1){this.arr[t]=[];for(let e=0;e<this.size;e+=1)t+e!==2*(this.size-1)?(this.arr[t][e]=t*this.size+e+1,this.bgPosArr.push(`${Math.round(100/(this.size-1)*e)}% ${Math.round(100/(this.size-1)*t)}%`)):this.arr[t][e]=0}}draw(){const t=this.cellSize/this.animationTime*this.timePassed;switch(this.direction){case"up":this.e.style.transform=`translate( 0, ${-t}rem)`;break;case"down":this.e.style.transform=`translate( 0, ${t}rem)`;break;case"left":this.e.style.transform=`translate( ${-t}rem, 0)`;break;case"right":this.e.style.transform=`translate( ${t}rem, 0)`;break;default:throw new Error(">:(")}}moveAnimation(){this.inAnimation=!0,this.start=Date.now(),this.timer=setInterval((()=>{if(this.timePassed=Date.now()-this.start,this.timePassed>=this.animationTime)return clearInterval(this.timer),void(this.inAnimation=!1);this.draw()}),20)}checkWin(){const t=[];for(let e=0;e<this.size;e+=1){t[e]=[];for(let i=0;i<this.size;i+=1)e+i!==2*(this.size-1)?t[e][i]=e*this.size+i+1:t[e][i]=0}for(let e=0;e<this.size;e+=1)for(let i=0;i<this.size;i+=1)if(e+i!==2*(this.size-1)&&t[e][i]!==this.arr[e][i])return!1;return!0}swap(t){if(!this.inAnimation)for(let e=0;e<this.arr.length;e+=1)for(let i=0;i<this.arr[e].length;i+=1)if(this.arr[e][i]===t&&(Math.abs(this.emptyX-e)<=1&&this.emptyY-i==0||Math.abs(this.emptyY-i)<=1&&this.emptyX-e==0)){this.movesCounter+=1,document.querySelector(".move").innerHTML=this.movesCounter;const t=document.querySelector("#cell-"+this.arr[this.emptyX][this.emptyY]);return this.e=document.querySelector("#cell-"+this.arr[e][i]),this.emptyX-e<0?(this.direction="up",this.moveAnimation()):this.emptyX-e>0?(this.direction="down",this.moveAnimation()):this.emptyY-i<0?(this.direction="left",this.moveAnimation()):this.emptyY-i>0&&(this.direction="right",this.moveAnimation()),setTimeout((()=>{const e=t.style.order;t.style.order=this.e.style.order,this.e.style.order=e,this.e.style.transform="",this.emptyX===this.emptyY&&this.emptyY===this.size-1&&this.checkWin()&&(document.querySelector(".board").innerHTML+=`Ура! Вы решили головоломку за ${document.querySelector(".time").innerHTML} и ${document.querySelector(".move").innerHTML} ходов`)}),this.animationTime),[this.arr[e][i],this.arr[this.emptyX][this.emptyY]]=[this.arr[this.emptyX][this.emptyY],this.arr[e][i]],this.emptyX=e,void(this.emptyY=i)}}init(){this.history=[],this.movesCounter=0,document.querySelector(".move").innerHTML=this.movesCounter,this.size=document.getElementById("fieldSize").value,this.cellSize=parseFloat(this.boardWidth/this.size-2*this.marginSize).toFixed(3),this.removeBoard(),this.createBoard(),this.shuffle(),this.renderBoard(),document.querySelectorAll(".cell").forEach((t=>{t.addEventListener("mouseup",(t=>{const e=t.target;this.swap(parseInt(e.innerHTML,10))})),t.addEventListener("dragstart",this.dragStart),t.addEventListener("dragover",this.dragOver),t.addEventListener("drop",this.dragDrop),t.addEventListener("dragend",this.dragEnd)}))}load(){this.cellSize=parseFloat(this.boardWidth/this.size-2*this.marginSize).toFixed(3),document.querySelector(".move").innerHTML=this.movesCounter,this.removeBoard(),this.renderBoard(),document.querySelectorAll(".cell").forEach((t=>{t.addEventListener("mouseup",(t=>{const e=t.target;this.swap(parseInt(e.innerHTML,10))})),t.addEventListener("dragstart",this.dragStart),t.addEventListener("dragover",this.dragOver),t.addEventListener("drop",this.dragDrop),t.addEventListener("dragend",this.dragEnd)}))}},e=new class{constructor(){this.currentTime=0}calcCurrentTime(){this.time=setInterval((()=>{this.currentTime+=1,this.secToMinAndSec()}),1e3)}secToMinAndSec(){this.minutes=Math.floor(this.currentTime/60),this.sec=(this.currentTime%60).toFixed(0),this.timer=`${this.minutes}:${this.sec<10?"0":""}${this.sec}`,this.renderTimer()}timerStop(){clearInterval(this.time),this.timer="0:00",this.renderTimer()}renderTimer(){document.querySelector(".time").innerHTML=this.timer}init(){this.timerStop(),this.currentTime=null,this.calcCurrentTime()}load(){this.timerStop(),this.secToMinAndSec(),this.renderTimer(),this.calcCurrentTime()}},i=document.createElement("header");i.classList.add("header"),i.innerHTML='<h1 class="heading">gem puzzle</h1>',document.body.appendChild(i);const s=document.createElement("div");s.classList.add("menu"),s.innerHTML='  \n  <div class="settings">\n    <button class="new-game btn">New</button>\n    <button class="save btn">Save</button>\n    <button class="load btn">Load</button>\n    <div class="size">\n      <select id="fieldSize">\n      <option selected="selected" value="4" disabled>Field size</option>\n        <option value="3">3</option>\n        <option value="4">4</option>\n        <option value="5">5</option>\n        <option value="6">6</option>\n        <option value="7">7</option>\n        <option value="8">8</option>\n      </select>\n    </div>\n  </div>\n  <div class="counters">\n    <div class="timer"><span>Timer:</span><span class="time">0:00</span></div>\n    <div class="moves"><span>Moves:</span><span class="move">0</span></div>\n  </div>',document.body.appendChild(s),t.init(),e.init(),document.querySelector(".new-game").addEventListener("click",(()=>{t.init(),e.init()})),document.querySelector(".save").addEventListener("click",(()=>{localStorage.setItem("gameSave",JSON.stringify({bgPosition:t.bgPosArr,history:t.history,size:t.size,boardTable:t.arr,time:e.currentTime,moves:t.movesCounter,zero:[t.emptyX,t.emptyY]}))})),document.querySelector(".load").addEventListener("click",(()=>{const{bgPosition:i,history:s,size:r,boardTable:h,time:n,moves:o,zero:a}=JSON.parse(localStorage.getItem("gameSave"));t.bgPosArr=i,t.history=s,t.size=r,e.currentTime=n,t.movesCounter=o,t.arr=h,t.load(),e.load(),[t.emptyX,t.emptyY]=a})),document.getElementById("fieldSize").addEventListener("change",(()=>{t.init(),e.init()}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9UaW1lci5qcyJdLCJuYW1lcyI6WyJib2FyZCIsInRoaXMiLCJoaXN0b3J5Iiwic2l6ZSIsImVtcHR5WCIsImVtcHR5WSIsImFuaW1hdGlvblRpbWUiLCJib2FyZFdpZHRoIiwibWFyZ2luU2l6ZSIsInJlbW92ZUJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iLCJib2R5IiwicmVtb3ZlQ2hpbGQiLCJkaXJlY3Rpb24iLCJhcnIiLCJFcnJvciIsInB1c2giLCJpIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibW92ZSIsImNlbGxOdW1iZXIiLCJvcmRlciIsImoiLCJjbGFzc05hbWUiLCJkcmFnZ2FibGUiLCJiR3BvcyIsImJnUG9zQXJyIiwiY2VsbFNpemUiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwid2lkdGgiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInJvdW5kIiwicmVtUGVyVGljayIsInRpbWVQYXNzZWQiLCJlIiwidHJhbnNmb3JtIiwiaW5BbmltYXRpb24iLCJzdGFydCIsIkRhdGUiLCJub3ciLCJ0aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImRyYXciLCJ3aW4iLCJudW1iZXIiLCJsZW5ndGgiLCJhYnMiLCJtb3Zlc0NvdW50ZXIiLCJxdWVyeVNlbGVjdG9yIiwiemVybyIsIm1vdmVBbmltYXRpb24iLCJzZXRUaW1lb3V0IiwidGVtcCIsImNoZWNrV2luIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiY3JlYXRlQm9hcmQiLCJzaHVmZmxlIiwicmVuZGVyQm9hcmQiLCJjZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsInN3YXAiLCJwYXJzZUludCIsImRyYWdTdGFydCIsImRyYWdPdmVyIiwiZHJhZ0Ryb3AiLCJkcmFnRW5kIiwiY3VycmVudFRpbWUiLCJ0aW1lIiwic2VjVG9NaW5BbmRTZWMiLCJtaW51dGVzIiwic2VjIiwicmVuZGVyVGltZXIiLCJ0aW1lclN0b3AiLCJjYWxjQ3VycmVudFRpbWUiLCJoZWFkZXIiLCJtZW51IiwiaW5pdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiYmdQb3NpdGlvbiIsImJvYXJkVGFibGUiLCJtb3ZlcyIsInBhcnNlIiwiZ2V0SXRlbSIsImxvYWQiXSwibWFwcGluZ3MiOiJtQkFHQSxNQUFNQSxFQUFRLElDSEMsTUFDYixjQUNFQyxLQUFLQyxRQUFVLEdBQ2ZELEtBQUtFLEtBQU8sRUFDWkYsS0FBS0csT0FBUyxFQUNkSCxLQUFLSSxPQUFTLEVBQ2RKLEtBQUtLLGNBQWdCLElBQ3JCTCxLQUFLTSxXQUFhLEtBQ2xCTixLQUFLTyxXQUFhLEdBQ2xCUCxLQUFLUSxZQUFjLEtBQ2pCQyxTQUFTQyxpQkFBaUIsVUFBVUMsU0FBU0MsSUFDM0NILFNBQVNJLEtBQUtDLFlBQVlGLE9BS2hDLEtBQUtHLEdBQ0gsT0FBUUEsR0FDTixJQUFLLEtBQ0hmLEtBQUtnQixJQUFJaEIsS0FBS0csUUFBUUgsS0FBS0ksUUFBVUosS0FBS2dCLElBQUloQixLQUFLRyxPQUFTLEdBQUdILEtBQUtJLFFBQ3BFSixLQUFLZ0IsSUFBSWhCLEtBQUtHLE9BQVMsR0FBR0gsS0FBS0ksUUFBVSxFQUN6Q0osS0FBS0csUUFBVSxFQUNmLE1BQ0YsSUFBSyxPQUNISCxLQUFLZ0IsSUFBSWhCLEtBQUtHLFFBQVFILEtBQUtJLFFBQVVKLEtBQUtnQixJQUFJaEIsS0FBS0csT0FBUyxHQUFHSCxLQUFLSSxRQUNwRUosS0FBS2dCLElBQUloQixLQUFLRyxPQUFTLEdBQUdILEtBQUtJLFFBQVUsRUFDekNKLEtBQUtHLFFBQVUsRUFDZixN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SUFDbEJrRSxLQUFNakMsRUFBTWdDLFlBQ1ppQixNQUFPbkcsRUFBTTBELGFBQ2JFLEtBQU0sQ0FBRTVELEVBQU1JLE9BQVFKLEVBQU1LLGNBS2xDSyxTQUFTaUQsY0FBYyxTQUFTYyxpQkFBaUIsU0FBUyxLQUN4RCxNQUFNLFdBQUV3QixFQUFVLFFBQUUvRixFQUFPLEtBQUVDLEVBQUksV0FBRStGLEVBQVUsS0FBRWYsRUFBSSxNQUFFZ0IsRUFBSyxLQUFFdkMsR0FBU21DLEtBQUtLLE1BQ3hFUCxhQUFhUSxRQUFRLGFBRXZCckcsRUFBTStCLFNBQVdrRSxFQUNqQmpHLEVBQU1FLFFBQVVBLEVBQ2hCRixFQUFNRyxLQUFPQSxFQUNiK0MsRUFBTWdDLFlBQWNDLEVBQ3BCbkYsRUFBTTBELGFBQWV5QyxFQUNyQm5HLEVBQU1pQixJQUFNaUYsRUFDWmxHLEVBQU1zRyxPQUNOcEQsRUFBTW9ELFFBQ0p0RyxFQUFNSSxPQUFRSixFQUFNSyxRQUFXdUQsS0FHbkNsRCxTQUFTdUQsZUFBZSxhQUFhUSxpQkFBaUIsVUFBVSxLQUM5RHpFLEVBQU00RixPQUNOMUMsRUFBTTBDLFciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkLmpzJztcclxuaW1wb3J0IFRpbWVyIGZyb20gJy4vVGltZXIuanMnO1xyXG5cclxuY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuY29uc3QgdGltZXIgPSBuZXcgVGltZXIoKTtcclxuXHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xyXG5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XHJcbmhlYWRlci5pbm5lckhUTUwgPSAnPGgxIGNsYXNzPVwiaGVhZGluZ1wiPmdlbSBwdXp6bGU8L2gxPic7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuXHJcbmNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxubWVudS5jbGFzc0xpc3QuYWRkKCdtZW51Jyk7XHJcblxyXG5tZW51LmlubmVySFRNTCA9IGAgIFxyXG4gIDxkaXYgY2xhc3M9XCJzZXR0aW5nc1wiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm5ldy1nYW1lIGJ0blwiPk5ldzwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cInNhdmUgYnRuXCI+U2F2ZTwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImxvYWQgYnRuXCI+TG9hZDwvYnV0dG9uPlxyXG4gICAgPGRpdiBjbGFzcz1cInNpemVcIj5cclxuICAgICAgPHNlbGVjdCBpZD1cImZpZWxkU2l6ZVwiPlxyXG4gICAgICA8b3B0aW9uIHNlbGVjdGVkPVwic2VsZWN0ZWRcIiB2YWx1ZT1cIjRcIiBkaXNhYmxlZD5GaWVsZCBzaXplPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj4zPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjRcIj40PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjVcIj41PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjZcIj42PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjdcIj43PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjhcIj44PC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImNvdW50ZXJzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGltZXJcIj48c3Bhbj5UaW1lcjo8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW1lXCI+MDowMDwvc3Bhbj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb3Zlc1wiPjxzcGFuPk1vdmVzOjwvc3Bhbj48c3BhbiBjbGFzcz1cIm1vdmVcIj4wPC9zcGFuPjwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcblxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lbnUpO1xyXG5cclxuYm9hcmQuaW5pdCgpO1xyXG50aW1lci5pbml0KCk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBib2FyZC5pbml0KCk7XHJcbiAgdGltZXIuaW5pdCgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zYXZlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXHJcbiAgICAnZ2FtZVNhdmUnLFxyXG4gICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBiZ1Bvc2l0aW9uOiBib2FyZC5iZ1Bvc0FycixcclxuICAgICAgaGlzdG9yeTogYm9hcmQuaGlzdG9yeSxcclxuICAgICAgc2l6ZTogYm9hcmQuc2l6ZSxcclxuICAgICAgYm9hcmRUYWJsZTogYm9hcmQuYXJyLFxyXG4gICAgICB0aW1lOiB0aW1lci5jdXJyZW50VGltZSxcclxuICAgICAgbW92ZXM6IGJvYXJkLm1vdmVzQ291bnRlcixcclxuICAgICAgemVybzogWyBib2FyZC5lbXB0eVgsIGJvYXJkLmVtcHR5WSBdXHJcbiAgICB9KVxyXG4gICk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCB7IGJnUG9zaXRpb24sIGhpc3RvcnksIHNpemUsIGJvYXJkVGFibGUsIHRpbWUsIG1vdmVzLCB6ZXJvIH0gPSBKU09OLnBhcnNlKFxyXG4gICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVTYXZlJylcclxuICApO1xyXG4gIGJvYXJkLmJnUG9zQXJyID0gYmdQb3NpdGlvbjtcclxuICBib2FyZC5oaXN0b3J5ID0gaGlzdG9yeTtcclxuICBib2FyZC5zaXplID0gc2l6ZTtcclxuICB0aW1lci5jdXJyZW50VGltZSA9IHRpbWU7XHJcbiAgYm9hcmQubW92ZXNDb3VudGVyID0gbW92ZXM7XHJcbiAgYm9hcmQuYXJyID0gYm9hcmRUYWJsZTtcclxuICBib2FyZC5sb2FkKCk7XHJcbiAgdGltZXIubG9hZCgpO1xyXG4gIFsgYm9hcmQuZW1wdHlYLCBib2FyZC5lbXB0eVkgXSA9IHplcm87XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkU2l6ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICBib2FyZC5pbml0KCk7XHJcbiAgdGltZXIuaW5pdCgpO1xyXG59KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5oaXN0b3J5ID0gW107XHJcbiAgICB0aGlzLnNpemUgPSA0O1xyXG4gICAgdGhpcy5lbXB0eVggPSAwO1xyXG4gICAgdGhpcy5lbXB0eVkgPSAwO1xyXG4gICAgdGhpcy5hbmltYXRpb25UaW1lID0gNDAwO1xyXG4gICAgdGhpcy5ib2FyZFdpZHRoID0gNDAuODtcclxuICAgIHRoaXMubWFyZ2luU2l6ZSA9IDAuMTtcclxuICAgIHRoaXMucmVtb3ZlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZCcpLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBtb3ZlKGRpcmVjdGlvbikge1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgIHRoaXMuYXJyW3RoaXMuZW1wdHlYXVt0aGlzLmVtcHR5WV0gPSB0aGlzLmFyclt0aGlzLmVtcHR5WCAtIDFdW3RoaXMuZW1wdHlZXTtcclxuICAgICAgICB0aGlzLmFyclt0aGlzLmVtcHR5WCAtIDFdW3RoaXMuZW1wdHlZXSA9IDA7XHJcbiAgICAgICAgdGhpcy5lbXB0eVggLT0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgdGhpcy5hcnJbdGhpcy5lbXB0eVhdW3RoaXMuZW1wdHlZXSA9IHRoaXMuYXJyW3RoaXMuZW1wdHlYICsgMV1bdGhpcy5lbXB0eVldO1xyXG4gICAgICAgIHRoaXMuYXJyW3RoaXMuZW1wdHlYICsgMV1bdGhpcy5lbXB0eVldID0gMDtcclxuICAgICAgICB0aGlzLmVtcHR5WCArPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGhpcy5hcnJbdGhpcy5lbXB0eVhdW3RoaXMuZW1wdHlZXSA9IHRoaXMuYXJyW3RoaXMuZW1wdHlYXVt0aGlzLmVtcHR5WSArIDFdO1xyXG4gICAgICAgIHRoaXMuYXJyW3RoaXMuZW1wdHlYXVt0aGlzLmVtcHR5WSArIDFdID0gMDtcclxuICAgICAgICB0aGlzLmVtcHR5WSArPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB0aGlzLmFyclt0aGlzLmVtcHR5WF1bdGhpcy5lbXB0eVldID0gdGhpcy5hcnJbdGhpcy5lbXB0eVhdW3RoaXMuZW1wdHlZIC0gMV07XHJcbiAgICAgICAgdGhpcy5hcnJbdGhpcy5lbXB0eVhdW3RoaXMuZW1wdHlZIC0gMV0gPSAwO1xyXG4gICAgICAgIHRoaXMuZW1wdHlZIC09IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc+OignKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNodWZmbGUoKSB7XHJcbiAgICB0aGlzLmhpc3RvcnkucHVzaChbIHRoaXMuZW1wdHlYLCB0aGlzLmVtcHR5WSBdKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZSAqKiAzOyBpICs9IDEpIHtcclxuICAgICAgc3dpdGNoIChNYXRoLmZsb29yKDQgKiBNYXRoLnJhbmRvbSgpKSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgIGlmICh0aGlzLmVtcHR5WCAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgTU9WRSBVUFxyXG5cclxuICAgICAgICAgICAgdGhpcy5tb3ZlKCd1cCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gIE1PVkUgRE9XTlxyXG4gICAgICAgICAgICB0aGlzLm1vdmUoJ2Rvd24nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuaGlzdG9yeS5wdXNoKFsgdGhpcy5lbXB0eVgsIHRoaXMuZW1wdHlZIF0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgaWYgKHRoaXMuZW1wdHlZICE9PSB0aGlzLnNpemUgLSAxKSB7XHJcbiAgICAgICAgICAgIC8vICBNT1ZFIFJJR0hUXHJcbiAgICAgICAgICAgIHRoaXMubW92ZSgncmlnaHQnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICBNT1ZFIExFRlRcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKCdsZWZ0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmhpc3RvcnkucHVzaChbIHRoaXMuZW1wdHlYLCB0aGlzLmVtcHR5WSBdKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIGlmICh0aGlzLmVtcHR5WCAhPT0gdGhpcy5zaXplIC0gMSkge1xyXG4gICAgICAgICAgICAvLyAgTU9WRSBET1dOXHJcbiAgICAgICAgICAgIHRoaXMubW92ZSgnZG93bicpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gIE1PVkUgVVBcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKCd1cCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5oaXN0b3J5LnB1c2goWyB0aGlzLmVtcHR5WCwgdGhpcy5lbXB0eVkgXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICBpZiAodGhpcy5lbXB0eVkgIT09IDApIHtcclxuICAgICAgICAgICAgLy8gIE1PVkUgTEVGVFxyXG4gICAgICAgICAgICB0aGlzLm1vdmUoJ2xlZnQnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICBNT1ZFIFJJR0hUXHJcbiAgICAgICAgICAgIHRoaXMubW92ZSgncmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnB1c2goWyB0aGlzLmVtcHR5WCwgdGhpcy5lbXB0eVkgXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc+OignKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyQm9hcmQoKSB7XHJcbiAgICBsZXQgYm9hcmQgPSAnJztcclxuICAgIGNvbnN0IGJvYXJkV2lkdGggPSBgJHt0aGlzLmJvYXJkV2lkdGh9cmVtYDtcclxuICAgIGxldCBjZWxsTnVtYmVyO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBvcmRlciA9IDE7IGkgPCB0aGlzLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaiArPSAxKSB7XHJcbiAgICAgICAgY2VsbE51bWJlciA9IHRoaXMuYXJyW2ldW2pdO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuYXJyW2ldW2pdID8gJ2NlbGwnIDogJ2NlbGwgZW1wdHknO1xyXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZSA9ICEhdGhpcy5hcnJbaV1bal07XHJcbiAgICAgICAgY29uc3QgYkdwb3MgPSB0aGlzLmJnUG9zQXJyW2NlbGxOdW1iZXIgLSAxXTtcclxuICAgICAgICBvcmRlciArPSAxO1xyXG5cclxuICAgICAgICBib2FyZCArPSBgPGRpdiBzdHlsZT0nd2lkdGg6JHt0aGlzLmNlbGxTaXplfXJlbTsgaGVpZ2h0OiR7dGhpc1xyXG4gICAgICAgICAgLmNlbGxTaXplfXJlbTsgb3JkZXI6JHtvcmRlcn07IGJhY2tncm91bmQtcG9zaXRpb246ICR7Ykdwb3N9OyBiYWNrZ3JvdW5kLXNpemU6ICR7Ym9hcmRXaWR0aH07JyBpZD0nY2VsbC0ke2NlbGxOdW1iZXJ9JyBjbGFzcz0nJHtjbGFzc05hbWV9JyBkcmFnZ2FibGU9XCIke2RyYWdnYWJsZX1cIj4ke2NlbGxOdW1iZXJ9PC9kaXY+YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcclxuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBib2FyZFdpZHRoO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBib2FyZDtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm9hcmQoKSB7XHJcbiAgICB0aGlzLmFyciA9IFtdO1xyXG4gICAgdGhpcy5iZ1Bvc0FyciA9IFtdO1xyXG4gICAgdGhpcy5lbXB0eVggPSB0aGlzLnNpemUgLSAxO1xyXG4gICAgdGhpcy5lbXB0eVkgPSB0aGlzLnNpemUgLSAxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICB0aGlzLmFycltpXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaiArPSAxKSB7XHJcbiAgICAgICAgaWYgKGkgKyBqICE9PSAodGhpcy5zaXplIC0gMSkgKiAyKSB7XHJcbiAgICAgICAgICB0aGlzLmFycltpXVtqXSA9IGkgKiB0aGlzLnNpemUgKyBqICsgMTtcclxuICAgICAgICAgIHRoaXMuYmdQb3NBcnIucHVzaChcclxuICAgICAgICAgICAgYCR7TWF0aC5yb3VuZCgxMDAgLyAodGhpcy5zaXplIC0gMSkgKiBqKX0lICR7TWF0aC5yb3VuZCgxMDAgLyAodGhpcy5zaXplIC0gMSkgKiBpKX0lYFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hcnJbaV1bal0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJhdygpIHtcclxuICAgIGNvbnN0IHJlbVBlclRpY2sgPSB0aGlzLmNlbGxTaXplIC8gdGhpcy5hbmltYXRpb25UaW1lICogdGhpcy50aW1lUGFzc2VkO1xyXG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgdGhpcy5lLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoIDAsICR7LXJlbVBlclRpY2t9cmVtKWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgIHRoaXMuZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCAwLCAke3JlbVBlclRpY2t9cmVtKWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgIHRoaXMuZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCAkey1yZW1QZXJUaWNrfXJlbSwgMClgO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgdGhpcy5lLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoICR7cmVtUGVyVGlja31yZW0sIDApYDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJz46KCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZUFuaW1hdGlvbigpIHtcclxuICAgIHRoaXMuaW5BbmltYXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XHJcblxyXG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy50aW1lUGFzc2VkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy50aW1lUGFzc2VkID49IHRoaXMuYW5pbWF0aW9uVGltZSkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XHJcbiAgICAgICAgdGhpcy5pbkFuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9LCAyMCk7XHJcbiAgfVxyXG5cclxuICBjaGVja1dpbigpIHtcclxuICAgIGNvbnN0IHdpbiA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICB3aW5baV0gPSBbXTtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemU7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChpICsgaiAhPT0gKHRoaXMuc2l6ZSAtIDEpICogMikge1xyXG4gICAgICAgICAgd2luW2ldW2pdID0gaSAqIHRoaXMuc2l6ZSArIGogKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5baV1bal0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemU7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChpICsgaiAhPT0gKHRoaXMuc2l6ZSAtIDEpICogMikge1xyXG4gICAgICAgICAgaWYgKHdpbltpXVtqXSAhPT0gdGhpcy5hcnJbaV1bal0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHN3YXAobnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5pbkFuaW1hdGlvbikgcmV0dXJuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnIubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmFycltpXS5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFycltpXVtqXSA9PT0gbnVtYmVyKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIChNYXRoLmFicyh0aGlzLmVtcHR5WCAtIGkpIDw9IDEgJiYgdGhpcy5lbXB0eVkgLSBqID09PSAwKSB8fFxyXG4gICAgICAgICAgICAoTWF0aC5hYnModGhpcy5lbXB0eVkgLSBqKSA8PSAxICYmIHRoaXMuZW1wdHlYIC0gaSA9PT0gMClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAvLyBNb3ZlIGNvdW50ZXJcclxuICAgICAgICAgICAgdGhpcy5tb3Zlc0NvdW50ZXIgKz0gMTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmUnKS5pbm5lckhUTUwgPSB0aGlzLm1vdmVzQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHplcm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2VsbC0ke3RoaXMuYXJyW3RoaXMuZW1wdHlYXVt0aGlzLmVtcHR5WV19YCk7XHJcbiAgICAgICAgICAgIHRoaXMuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjZWxsLSR7dGhpcy5hcnJbaV1bal19YCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgZmluZCB3aGVyZSBhcmUgd2UgbW92aW5nXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVtcHR5WCAtIGkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xyXG4gICAgICAgICAgICAgIHRoaXMubW92ZUFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW1wdHlYIC0gaSA+IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcclxuICAgICAgICAgICAgICB0aGlzLm1vdmVBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVtcHR5WSAtIGogPCAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbXB0eVkgLSBqID4gMCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcclxuICAgICAgICAgICAgICB0aGlzLm1vdmVBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHplcm8uc3R5bGUub3JkZXI7XHJcbiAgICAgICAgICAgICAgemVyby5zdHlsZS5vcmRlciA9IHRoaXMuZS5zdHlsZS5vcmRlcjtcclxuICAgICAgICAgICAgICB0aGlzLmUuc3R5bGUub3JkZXIgPSB0ZW1wO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLmUuc3R5bGUudHJhbnNmb3JtID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmVtcHR5WCA9PT0gdGhpcy5lbXB0eVkgJiYgdGhpcy5lbXB0eVkgPT09IHRoaXMuc2l6ZSAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrV2luKCkpIHtcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgICAgICAgICAnLmJvYXJkJ1xyXG4gICAgICAgICAgICAgICAgICApLmlubmVySFRNTCArPSBg0KPRgNCwISDQktGLINGA0LXRiNC40LvQuCDQs9C+0LvQvtCy0L7Qu9C+0LzQutGDINC30LAgJHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlubmVySFRNTH0g0LggJHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZScpLmlubmVySFRNTH0g0YXQvtC00L7QsmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLmFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgICAgICAgICAgWyB0aGlzLmFycltpXVtqXSwgdGhpcy5hcnJbdGhpcy5lbXB0eVhdW3RoaXMuZW1wdHlZXSBdID0gW1xyXG4gICAgICAgICAgICAgIHRoaXMuYXJyW3RoaXMuZW1wdHlYXVt0aGlzLmVtcHR5WV0sXHJcbiAgICAgICAgICAgICAgdGhpcy5hcnJbaV1bal1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eVggPSBpO1xyXG4gICAgICAgICAgICB0aGlzLmVtcHR5WSA9IGo7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLmhpc3RvcnkgPSBbXTtcclxuICAgIHRoaXMubW92ZXNDb3VudGVyID0gMDtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlJykuaW5uZXJIVE1MID0gdGhpcy5tb3Zlc0NvdW50ZXI7XHJcbiAgICB0aGlzLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGRTaXplJykudmFsdWU7XHJcblxyXG4gICAgdGhpcy5jZWxsU2l6ZSA9IHBhcnNlRmxvYXQodGhpcy5ib2FyZFdpZHRoIC8gdGhpcy5zaXplIC0gMiAqIHRoaXMubWFyZ2luU2l6ZSkudG9GaXhlZCgzKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZUJvYXJkKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCk7XHJcbiAgICB0aGlzLnNodWZmbGUoKTtcclxuICAgIHRoaXMucmVuZGVyQm9hcmQoKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBldnQudGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc3dhcChwYXJzZUludChlbGVtLmlubmVySFRNTCwgMTApKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcclxuXHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyKTtcclxuXHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJhZ0Ryb3ApO1xyXG5cclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMuY2VsbFNpemUgPSBwYXJzZUZsb2F0KHRoaXMuYm9hcmRXaWR0aCAvIHRoaXMuc2l6ZSAtIDIgKiB0aGlzLm1hcmdpblNpemUpLnRvRml4ZWQoMyk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZScpLmlubmVySFRNTCA9IHRoaXMubW92ZXNDb3VudGVyO1xyXG4gICAgdGhpcy5yZW1vdmVCb2FyZCgpO1xyXG4gICAgdGhpcy5yZW5kZXJCb2FyZCgpO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5zd2FwKHBhcnNlSW50KGVsZW0uaW5uZXJIVE1MLCAxMCkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnQpO1xyXG5cclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXIpO1xyXG5cclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcmFnRHJvcCk7XHJcblxyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgLy8gdGhpcy50aW1lciA9ICcwOjAwJztcclxuICB9XHJcblxyXG4gIGNhbGNDdXJyZW50VGltZSgpIHtcclxuICAgIHRoaXMudGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50VGltZSArPSAxO1xyXG4gICAgICB0aGlzLnNlY1RvTWluQW5kU2VjKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcblxyXG4gIHNlY1RvTWluQW5kU2VjKCkge1xyXG4gICAgdGhpcy5taW51dGVzID0gTWF0aC5mbG9vcih0aGlzLmN1cnJlbnRUaW1lIC8gNjApO1xyXG5cclxuICAgIHRoaXMuc2VjID0gKHRoaXMuY3VycmVudFRpbWUgJSA2MCkudG9GaXhlZCgwKTtcclxuICAgIHRoaXMudGltZXIgPSBgJHt0aGlzLm1pbnV0ZXN9OiR7dGhpcy5zZWMgPCAxMCA/ICcwJyA6ICcnfSR7dGhpcy5zZWN9YDtcclxuICAgIHRoaXMucmVuZGVyVGltZXIoKTtcclxuICB9XHJcblxyXG4gIHRpbWVyU3RvcCgpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgIHRoaXMudGltZXIgPSAnMDowMCc7XHJcbiAgICB0aGlzLnJlbmRlclRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJUaW1lcigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJykuaW5uZXJIVE1MID0gdGhpcy50aW1lcjtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLnRpbWVyU3RvcCgpO1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IG51bGw7XHJcbiAgICB0aGlzLmNhbGNDdXJyZW50VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMudGltZXJTdG9wKCk7XHJcbiAgICB0aGlzLnNlY1RvTWluQW5kU2VjKCk7XHJcbiAgICB0aGlzLnJlbmRlclRpbWVyKCk7XHJcblxyXG4gICAgdGhpcy5jYWxjQ3VycmVudFRpbWUoKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=