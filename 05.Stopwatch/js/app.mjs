// DOM Nodes ---------------
const $display = document.querySelector('.display');
const [$playButton, $resetButton] = document.querySelectorAll('.control');

// function ----------------
const convertToTime = ms => {
  const min = Math.floor(ms / 1000 / 60);
  const sec = Math.floor((ms / 1000) % 60);
  const millis = Math.floor((ms % 1000) / 10);

  const format = n => (n < 10 ? '0' + n : n + '');

  return `${format(min)}:${format(sec)}:${format(millis)}`;
};

const Stopwatch = {
  initMillis: 0,

  state: 'stop',

  laps: [],

  reset() {
    this.laps = [];
  },

  start() {
    this.state = 'start';
    this.initMillis = new Date();

    $playButton.textContent = 'Stop';
    $resetButton.textContent = 'Laps';

    return setInterval(() => {
      if (this.state === 'stop') return;

      $display.textContent = convertToTime(new Date() - this.initMillis);
    }, 10);
  },

  stop() {
    this.state = 'stop';
    $playButton.textContent = 'Start';
    $resetButton.textContent = 'Reset';
  },

  getLaps() {
    this.laps = [...this.laps, new Date() - this.initMillis];

    const $newEl = document.createDocumentFragment();
    this.laps.forEach((lap, i) => {});

    // const $el = document.createElement('div');
    // this.laps
    //   .map(
    //     (lap, i) =>
    //       `<div>${i + 1}</div>
    //        <div>${convertToTime(lap)}</div>`
    //   )
    //   .join('')
  }
};

// Event Binding------------
$playButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.start() : Stopwatch.stop();
};

$resetButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.reset() : Stopwatch.getLaps();
};

//--------------------------

// $display.onclick = () => {
//   console.log('hi');
// };

// console.log(Stopwatch.getTime());

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
