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

  timerPause() {
    clearInterval(this.time);
  }

  renderTimer() {
    document.querySelector('.time').innerHTML = this.timer;
  }

  init() {
    this.timerStop();
    this.currentTime = null;
    this.calcCurrentTime();
  }

  load() {
    this.timerStop();
    this.secToMinAndSec();
    this.renderTimer();

    this.calcCurrentTime();
  }
}
