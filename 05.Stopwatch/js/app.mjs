// DOM Nodes ---------------
const $display = document.querySelector('.display');

// function ----------------
const render = time => {
  $display.textContent = time;
};

const convertToTime = ms => {
  const min = Math.floor(ms / 1000 / 60);
  const sec = Math.floor((ms / 1000) % 60);
  const millis = Math.floor((ms % 1000) / 10);

  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(min)}:${format(sec)}:${format(millis)}`;
};

const Stopwatch = {
  initMillis: new Date(),

  isStop: false,

  laps: [],

  reset() {
    this.laps = [];
  },

  getTime() {
    return setInterval(() => {
      if (this.isStop) return;
      $display.textContent = convertToTime(new Date() - this.initMillis);
    }, 10);
  },

  getLaps() {
    this.laps = [...this.laps, this.initMillis];
  }
};

// $display.onclick = () => {
//   console.log('hi');
// };

console.log(Stopwatch.getTime());

// setInterval(() => {
//   console.log(timer.getTime());
// }, 10);

// Event Binding------------

// DOM Nodes --------------
// const [$playButton, $resetButton] = document.querySelectorAll('.control');
// const $laps = document.querySelector('.laps');
// const $display = document.querySelector('.display');
// let startTime = new Date();
// let intervalController = null;
// let laps = 1;
// let timeInterval = null;

// function --------------
// const getTime = ms => {
//   let _ms = ms;
//   const minute = Math.floor(_ms / (1000 * 60));
//   _ms -= 1000 * 60 * minute;
//   const second = Math.floor(_ms / 1000);
//   _ms -= 1000 * second;
//   const format = n => (n < 10 ? '0' + n : n + '');
//   return `${format(minute)}:${format(second)}:${format(Math.floor(_ms / 10))}`;
// };

// const timer = () => {
//   const now = new Date();
//   $display.textContent = getTime(now - startTime);
//   timeInterval = now - startTime;
// };

// const reset = () => {
//   [...$laps.children].forEach($lap => {
//     $lap.classList.contains('lap-title')
//       ? ($lap.style.display = 'none')
//       : $lap.remove();
//   });
// };

// // Event Binding
// $playButton.onclick = () => {
//   if ($playButton.textContent === 'Start') {
//     $playButton.textContent = 'Stop';
//     $resetButton.textContent = 'Lap';
//     $resetButton.disabled = false;
//     if (timeInterval) startTime = new Date() - timeInterval;
//     else startTime = new Date();
//     intervalController = setInterval(timer, 10);
//   } else {
//     $playButton.textContent = 'Start';
//     $resetButton.textContent = 'Reset';
//     clearInterval(intervalController);
//   }
// };

// $resetButton.onclick = () => {
//   if ($resetButton.textContent === 'Lap') {
//     [...$laps.children].forEach($lap => {
//       if ($lap.classList.contains('lap-title')) $lap.style.display = 'grid';
//     });
//     const $el = document.createElement('div');
//     $el.appendChild(document.createTextNode(laps++));
//     $laps.appendChild($el);
//     const $el2 = document.createElement('div');
//     $el2.appendChild(document.createTextNode($display.textContent));
//     $laps.appendChild($el2);
//   } else {
//     $resetButton.disabled = 'true';
//     laps = 1;
//     startTime = new Date();
//     timeInterval = null;
//     $display.textContent = getTime(0);
//     reset();
//   }
// };

// window.addEventListener('DOMContentLoaded', () => {
//   [...$laps.children].forEach($lap => {
//     if ($lap.classList.contains('lap-title')) $lap.style.display = 'none';
//   });
// });
