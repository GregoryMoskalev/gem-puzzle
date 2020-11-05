export default class Timer {
  constructor() {
    this.currentTime = 0;
    // this.timer = '0:00';
  }

  calcCurrentTime() {
    this.time = setInterval(() => {
      this.currentTime += 1;
      this.secToMinAndSec();
    }, 1000);
  }

  secToMinAndSec() {
    this.minutes = Math.floor(this.currentTime / 60);

    this.sec = (this.currentTime % 60).toFixed(0);
    this.timer = `${this.minutes}:${this.sec < 10 ? '0' : ''}${this.sec}`;
    this.renderTimer();
  }

  timerStop() {
    clearInterval(this.time);
    this.timer = '0:00';
    this.renderTimer();
  }

  renderTimer() {
    document.querySelector('.time').innerHTML = this.timer;
  }

  init() {
    this.timerStop();
    this.currentTime = 0;
    this.calcCurrentTime();
  }
}

// calcStartTime() {
//   this.startDate = Date.now();
//   console.log(this.startDate);
// }

// calcCurrentTime() {
//   this.currentTime = Date.now() - this.startDate;
//   console.log(this.currentTime);
// }

// initTimer() {
//   this.calcStartTime();
//   this.time();
// }

// msToMinAndSec() {
//   this.minutes = Math.floor(this.currentTime / 60000);
//   this.sec = ((this.currentTime % 60000) / 1000).toFixed(0);

//   return `${this.minutes}:${this.sec < 10 ? '0' : ''}${this.sec}`;
// }

// time() {
//   this.time = setInterval(() => {
//     this.calcCurrentTime();
//     console.log(this.msToMinAndSec());
//   }, 500);
// }
