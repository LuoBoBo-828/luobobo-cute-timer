# Learning Timer with Rewards and To-Do List

A web-based countdown timer designed for focused learning sessions, featuring image animations, pause/resume functionality, a carrot reward system for completed hours, and an integrated to-do list for task management.

## Features
- **Countdown Timer:** Enter time in minutes and seconds for learning sessions.
- **Image Animation:** Two images switch rapidly during the countdown for visual engagement.
- **Pause and Continue:** Temporarily stop and resume the timer as needed.
- **Alarm System:** Plays a sound when the countdown reaches zero, with a stop button to silence it.
- **Background Audio:** Choose from ambient sounds like white noise or silence during countdown.

- **Carrot Reward System:** Earn virtual carrots for every hour of completed learning time in the current session. Carrots reset when the page is closed.
- **To-Do List:** Add, check off, and delete tasks with a scrollable, persistent list.

## Carrot Reward System
- Accumulate learning minutes across multiple timers in a session.
- Earn 1 carrot for every 60 minutes of completed countdown time in the current session.
- Carrots are displayed at the top and reset to zero when the page is closed.

## To-Do List
- Located on the right side of the interface.
- Add tasks by typing in the input field and pressing Enter.
- Check off completed tasks with checkboxes (strikethrough effect).
- Delete tasks using the × button next to each item.
- List scrolls if many tasks are added.
- Tasks persist across browser sessions using localStorage.

## File Structure
- `index.html`: Main HTML file with the user interface
- `index.js`: JavaScript logic for countdown, image switching, rewards, audio, and to-do functionality
- `style.css`: CSS styles for the page layout and elements
- `assets/`: Folder containing images and audio files
  - `image1.jpg` and `image2.jpg`: Images that switch during countdown
  - `alarm.mp3`: Alarm sound file
  - `rain.mp3`: Background rain sounds audio file
  - `background.jpg`: Background image

## Usage
1. Open `index.html` in a web browser.
2. Enter the desired countdown time in minutes and seconds.
3. Select background audio: Rain Sounds or None.
4. Click "Start Countdown" to begin the timer, image animation, and background audio.
5. Use "Pause" to temporarily stop the countdown and audio, "Continue" to resume.
6. When the countdown reaches zero, background audio stops, alarm plays, images display, and carrots are awarded.
8. Click "Stop Alarm" to silence the alarm.
9. Monitor your carrot count at the top - they reset daily.
10. Use the To-Do List on the right: Add tasks with Enter, check them off, or delete with ×.
