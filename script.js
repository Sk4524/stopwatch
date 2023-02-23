const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let timer = null;
let hours = 0, minutes = 0, seconds = 0;

// Load last time from local storage
if (localStorage.getItem('stopwatch')) {
  const time = JSON.parse(localStorage.getItem('stopwatch'));
  hours = time.hours;
  minutes = time.minutes;
  seconds = time.seconds;
  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (timer !== null) {
    // Timer already running, do nothing
    return;
  }

  timer = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;

      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }

    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  display.textContent = '00:00:00';
  localStorage.removeItem('stopwatch');
}

startBtn.addEventListener('click', () => {
  startTimer();
  localStorage.setItem('stopwatch', JSON.stringify({hours, minutes, seconds}));
});

stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
