export default class Timer {
  constructor() {
    this.currentTime = 0;
  }

  calcCurrentTime() {
    this.time = setInterval(() => {
      this.currentTime += 1;
      this.secToMinAndSec();
    }, 1000);
  }

  secToMinAndSec() {
    const minutes = Math.floor(this.currentTime / 60);
    const sec = (this.currentTime % 60).toFixed(0);

    this.updateTimer(`${minutes}:${sec < 10 ? '0' : ''}${sec}`);
  }

  updateTimer(newTimeValue) {
    this.timer = newTimeValue;
    document.querySelector('.time').innerHTML = newTimeValue;
    this.renderTimer();
  }

  timerStop() {
    clearInterval(this.time);
    this.updateTimer('0:00');
  }

  renderTimer() {
    document.querySelector('.time').innerHTML = this.timer;
  }

  timerPause() {
    clearInterval(this.time);
  }



  init() {
    this.timerStop();
    this.currentTime = null;
    this.calcCurrentTime();
  }

  load() {
    this.timerStop();
    this.secToMinAndSec();

    this.calcCurrentTime();
  }
}
