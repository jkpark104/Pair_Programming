// Constant Number
const EXCUTE_AFTER_MILLISECOND = 10;

// DOM Nodes ---------------
const $display = document.querySelector('.display');
const [$startButton, $resetButton] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');

// function ----------------
const clearLaps = () => {
  [...$laps.children].forEach($lap => {
    $lap.matches('.lap-title') ? ($lap.style.display = 'none') : $lap.remove();
  });
};

const convertToTime = millis => {
  const min = Math.floor(millis / 1000 / 60);
  const sec = Math.floor((millis / 1000) % 60);
  const ms = Math.floor((millis % 1000) / 10);

  const format = n => (n < 10 ? '0' + n : n + '');

  return `${format(min)}:${format(sec)}:${format(ms)}`;
};

// Stopwatch Object
const Stopwatch = {
  initMillis: null,

  state: 'stop',

  laps: [],

  reset() {
    this.initMillis = null;

    $display.textContent = convertToTime(0);

    this.laps = [];

    clearLaps();

    $resetButton.disabled = true;
  },

  start() {
    this.initMillis === null
      ? (this.initMillis = new Date())
      : (this.initMillis = new Date() - this.initMillis);

    this.state = 'start';

    $startButton.textContent = 'Stop';
    $resetButton.textContent = 'Laps';
    $resetButton.disabled = false;

    return setInterval(() => {
      if (this.state === 'stop') return;

      $display.textContent = convertToTime(new Date() - this.initMillis);
    }, EXCUTE_AFTER_MILLISECOND);
  },

  stop() {
    this.state = 'stop';
    this.initMillis = new Date() - this.initMillis;
    $startButton.textContent = 'Start';
    $resetButton.textContent = 'Reset';
  },

  getLaps() {
    [...$laps.children].forEach($lap => {
      if ($lap.matches('.lap-title')) $lap.style.display = 'grid';
    });

    this.laps = [...this.laps, new Date() - this.initMillis];

    const $domFragment = document.createDocumentFragment();

    [this.laps.length, convertToTime(this.laps[this.laps.length - 1])].forEach(
      info => {
        const $div = document.createElement('div');
        $div.appendChild(document.createTextNode(info));
        $domFragment.appendChild($div);
      }
    );

    $laps.appendChild($domFragment);
  }
};

// Event Binding------------
$startButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.start() : Stopwatch.stop();
};

$resetButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.reset() : Stopwatch.getLaps();
};

window.addEventListener('DOMContentLoaded', () => {
  clearLaps();

  $resetButton.disabled = true;
});
