const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const timerDisplay = document.getElementById('timer');
const alarm = document.getElementById('alarm');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const continueBtn = document.getElementById('continueBtn');
const stopBtn = document.getElementById('stopBtn');
const carrotsDisplay = document.getElementById('carrots');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');
const bgAudio = document.getElementById('bgAudio');
const audioSelect = document.getElementById('audioSelect');
const audioPlayBtn = document.getElementById('audioPlayBtn');
const audioProgress = document.getElementById('audioProgress');
const currentTrack = document.getElementById('currentTrack');

const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

let interval;
let countdown;
let showFirst = true;
let imageInterval;
let isPaused = false;
let initialCountdown;

// Load or initialize data
let carrots = 0;
let totalMinutes = 0;
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Update carrots display
function updateCarrotsDisplay() {
  carrotsDisplay.textContent = `Carrots: ${carrots}`;
}
updateCarrotsDisplay();

// Render to-do list
function renderTodoList() {
  todoListEl.innerHTML = '';
  todoList.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.completed) li.classList.add('completed');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => {
      item.completed = checkbox.checked;
      li.classList.toggle('completed');
      saveTodoList();
    });
    
    const label = document.createElement('label');
    label.textContent = item.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      saveTodoList();
    });
    
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    todoListEl.appendChild(li);
  });
}
renderTodoList();

// Add task on enter
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && todoInput.value.trim()) {
    todoList.push({ text: todoInput.value.trim(), completed: false });
    todoInput.value = '';
    renderTodoList();
    saveTodoList();
  }
});

// Save to-do list
function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Make the alarm loop continuously
alarm.loop = true;

// Function to start countdown and image switching
function startCountdown() {
  lastAnnouncedMinutes = -1; // Reset for new session
  // Quick image switching every 100ms
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

      // Fade out background audio smoothly
      fadeOutAudio(bgAudio, 3000);

      // Add session time to total
      totalMinutes += Math.floor(initialCountdown / 60);
      carrots = Math.floor(totalMinutes / 60);

      // Update display
      updateCarrotsDisplay();

      img1.style.display = 'block';
      img2.style.display = 'block';
      alarm.play();
    }
  }, 1000);
}

// Start countdown button
startBtn.addEventListener('click', () => {
  clearInterval(interval);
  clearInterval(imageInterval);

  // Reset alarm
  alarm.pause();
  alarm.currentTime = 0;

  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  if (seconds >= 60) {
    alert("Seconds must be less than 60!");
    return;
  }

  countdown = minutes * 60 + seconds;

  if (countdown <= 0) {
    alert("Please set a valid time!");
    return;
  }

  initialCountdown = countdown;
  isPaused = false;
  updateTimerDisplay();

  // Initial image display
  showFirst = true;
  img1.style.display = 'block';
  img2.style.display = 'none';

  // Start background audio if selected
  if (audioSelect.value) {
    bgAudio.src = audioSelect.value;
    bgAudio.play().catch(()=>{});
    isAudioPlaying = true;
    audioPlayBtn.textContent = 'Pause';
    updateCurrentTrack();
  }

  startCountdown();
});

// Pause button
pauseBtn.addEventListener('click', () => {
  if (!isPaused) {
    clearInterval(interval);
    clearInterval(imageInterval);
    cancelFade();
    bgAudio.pause();
    isPaused = true;
    isAudioPlaying = false;
    audioPlayBtn.textContent = 'Play';
  }
});

// Continue button
continueBtn.addEventListener('click', () => {
  if (isPaused && countdown > 0) {
    isPaused = false;
    if (audioSelect.value) {
      cancelFade();
      bgAudio.play().catch(()=>{});
      isAudioPlaying = true;
      audioPlayBtn.textContent = 'Pause';
    }
    startCountdown();
  }
});

// Stop alarm button
stopBtn.addEventListener('click', () => {
  alarm.pause();
  alarm.currentTime = 0;
});

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(countdown / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (countdown % 60)
    .toString()
    .padStart(2, '0');

  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// ===== Audio control state & helpers =====
let isAudioPlaying = false;
let userSeeking = false;
let fadeInterval = null;
let fadeTimeout = null;
let originalVolume = bgAudio.volume || 1;

function updateCurrentTrack() {
  const val = audioSelect.value;
  if (!val) currentTrack.textContent = 'No track';
  else {
    const text = audioSelect.options[audioSelect.selectedIndex].text;
    currentTrack.textContent = text;
  }
}
updateCurrentTrack();

// Switch tracks during playback and keep playing if it was playing
audioSelect.addEventListener('change', () => {
  const wasPlaying = !bgAudio.paused && !bgAudio.ended;
  if (audioSelect.value) {
    cancelFade();
    bgAudio.src = audioSelect.value;
    updateCurrentTrack();
    if (wasPlaying || isAudioPlaying) {
      bgAudio.play().catch(()=>{});
      isAudioPlaying = true;
      audioPlayBtn.textContent = 'Pause';
    } else {
      bgAudio.currentTime = 0;
    }
  } else {
    cancelFade();
    bgAudio.pause();
    bgAudio.currentTime = 0;
    isAudioPlaying = false;
    audioPlayBtn.textContent = 'Play';
    updateCurrentTrack();
  }
});

// Play/pause control for background music
audioPlayBtn.addEventListener('click', () => {
  if (bgAudio.paused) {
    bgAudio.play().catch(()=>{});
    isAudioPlaying = true;
    audioPlayBtn.textContent = 'Pause';
  } else {
    cancelFade();
    bgAudio.pause();
    isAudioPlaying = false;
    audioPlayBtn.textContent = 'Play';
  }
});

// Progress bar updates and seeking
bgAudio.addEventListener('timeupdate', () => {
  if (!userSeeking && bgAudio.duration) {
    audioProgress.value = (bgAudio.currentTime / bgAudio.duration) * 100;
  }
});
bgAudio.addEventListener('loadedmetadata', () => {
  if (bgAudio.duration) {
    audioProgress.value = 0;
  }
});

audioProgress.addEventListener('input', () => {
  if (!bgAudio.duration) return;
  userSeeking = true;
  const seekTime = (audioProgress.value / 100) * bgAudio.duration;
  bgAudio.currentTime = seekTime;
});

audioProgress.addEventListener('change', () => {
  userSeeking = false;
});

// Keep UI synced with audio play/pause
bgAudio.addEventListener('play', () => {
  isAudioPlaying = true;
  audioPlayBtn.textContent = 'Pause';
});
bgAudio.addEventListener('pause', () => {
  isAudioPlaying = false;
  audioPlayBtn.textContent = 'Play';
});

// Fade-out helpers
function cancelFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
  if (fadeTimeout) {
    clearTimeout(fadeTimeout);
    fadeTimeout = null;
  }
  bgAudio.volume = originalVolume;
}

function fadeOutAudio(audio, duration = 3000) {
  cancelFade();
  originalVolume = audio.volume || 1;
  const steps = 30;
  const stepTime = duration / steps;
  let step = 0;
  fadeInterval = setInterval(() => {
    step++;
    const newVol = Math.max(0, originalVolume * (1 - step / steps));
    audio.volume = newVol;
    if (step >= steps) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = originalVolume;
    }
  }, stepTime);
}

// Replace instantaneous audio stop with a fade when countdown finishes
// (Handled inside startCountdown's end logic by calling fadeOutAudio(bgAudio, 3000))
