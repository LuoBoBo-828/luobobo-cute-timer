const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const timerDisplay = document.getElementById('timer');
const alarm = document.getElementById('alarm');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timeInput = document.getElementById('timeInput');

let interval;
let countdown;
let showFirst = true;
let imageInterval;

// Make the alarm loop continuously
alarm.loop = true;

// Start countdown button
startBtn.addEventListener('click', () => {
  clearInterval(interval);
  clearInterval(imageInterval);

  // Reset alarm to start
  alarm.pause();
  alarm.currentTime = 0;

  let time = parseInt(timeInput.value);
  if (isNaN(time) || time <= 0) {
    alert("Please enter a valid number of seconds!");
    return;
  }

  countdown = time;
  updateTimerDisplay();

  // Quick image switching every 100ms
  showFirst = true;
  img1.style.display = 'block';
  img2.style.display = 'none';
  imageInterval = setInterval(() => {
    showFirst = !showFirst;
    img1.style.display = showFirst ? 'block' : 'none';
    img2.style.display = showFirst ? 'none' : 'block';
  }, 100);

  // Countdown timer
  interval = setInterval(() => {
    countdown--;
    updateTimerDisplay();
    if (countdown <= 0) {
      clearInterval(interval);
      clearInterval(imageInterval);
      img1.style.display = 'block';
      img2.style.display = 'block';
      alarm.play(); // Play alarm continuously
    }
  }, 1000);
});

// Stop alarm button
stopBtn.addEventListener('click', () => {
  alarm.pause();          // Stop playback
  alarm.currentTime = 0;  // Reset to start
});

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
  const seconds = (countdown % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}
