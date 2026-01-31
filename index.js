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

const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

let interval;
let countdown;
let showFirst = true;
let imageInterval;
let isPaused = false;
let initialCountdown;

// Load or initialize data
const today = new Date().toDateString();
const storedDate = localStorage.getItem('lastDate');
if (storedDate !== today) {
  localStorage.setItem('carrots', 0);
  localStorage.setItem('totalMinutes', 0);
  localStorage.setItem('lastDate', today);
}
let carrots = parseInt(localStorage.getItem('carrots')) || 0;
let totalMinutes = parseInt(localStorage.getItem('totalMinutes')) || 0;
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

      // Add session time to total
      totalMinutes += Math.floor(initialCountdown / 60);
      carrots = Math.floor(totalMinutes / 60);

      // Save to localStorage
      localStorage.setItem('totalMinutes', totalMinutes);
      localStorage.setItem('carrots', carrots);

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

  startCountdown();
});

// Pause button
pauseBtn.addEventListener('click', () => {
  if (!isPaused) {
    clearInterval(interval);
    clearInterval(imageInterval);
    isPaused = true;
  }
});

// Continue button
continueBtn.addEventListener('click', () => {
  if (isPaused && countdown > 0) {
    isPaused = false;
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