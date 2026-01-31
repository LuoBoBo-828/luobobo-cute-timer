# Learning Timer with Rewards and To-Do List

A web-based countdown timer designed for focused learning sessions, featuring image animations, pause/resume functionality, a carrot reward system for completed hours, and an integrated to-do list for task management.

## Features
- **Countdown Timer:** Enter time in minutes and seconds for learning sessions.
- **Image Animation:** Two images switch rapidly during the countdown for visual engagement.
- **Pause and Continue:** Temporarily stop and resume the timer as needed.
- **Alarm System:** Plays a sound when the countdown reaches zero, with a stop button to silence it.
- **Carrot Reward System:** Earn virtual carrots for every hour of completed learning time.
- **Daily Reset:** Carrots and learning time reset to zero each new day.
- **To-Do List:** Add, check off, and delete tasks with a scrollable, persistent list.

## Carrot Reward System
- Accumulate learning minutes across multiple sessions in a day.
- Earn 1 carrot for every 60 minutes of completed countdown time.
- Carrots are displayed at the top and persist until midnight, when they reset.
- Encourages consistent learning habits with gamification.

## To-Do List
- Located on the right side of the interface.
- Add tasks by typing in the input field and pressing Enter.
- Check off completed tasks with checkboxes (strikethrough effect).
- Delete tasks using the × button next to each item.
- List scrolls if many tasks are added.
- Tasks persist across browser sessions using localStorage.

## File Structure
- `index.html`: Main HTML file with the user interface
- `index.js`: JavaScript logic for countdown, image switching, rewards, and to-do functionality
- `style.css`: CSS styles for the page layout and elements
- `assets/`: Folder containing images and audio files
  - `image1.jpg` and `image2.jpg`: Images that switch during countdown
  - `alarm.mp3`: Alarm sound file
  - `background.jpg`: Background image

## Usage
1. Open `index.html` in a web browser.
2. Enter the desired countdown time in minutes and seconds.
3. Click "Start Countdown" to begin the timer and image animation.
4. Use "Pause" to temporarily stop the countdown and "Continue" to resume.
5. When the countdown reaches zero, an alarm plays, images display, and carrots are awarded based on session time.
6. Click "Stop Alarm" to silence the alarm.
7. Monitor your carrot count at the top - they reset daily.
8. Use the To-Do List on the right: Add tasks with Enter, check them off, or delete with ×.
