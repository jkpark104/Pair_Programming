// DOM Nodes ---------------
const $display = document.querySelector('.display');
const [$playButton, $resetButton] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');

// function ----------------
const initLaps = () => {
  [...$laps.children].forEach($lap => {
    $lap.matches('.lap-title') ? ($lap.style.display = 'none') : $lap.remove();
  });
};

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
    this.initMillis = 0;

    $display.textContent = convertToTime(0);

    this.laps = [];

    initLaps();

    $resetButton.disabled = true;
  },

  start() {
    this.initMillis === 0
      ? (this.initMillis = new Date())
      : (this.initMillis = new Date() - this.initMillis);

    this.state = 'start';

    $playButton.textContent = 'Stop';
    $resetButton.textContent = 'Laps';
    $resetButton.disabled = false;

    return setInterval(() => {
      if (this.state === 'stop') return;

      $display.textContent = convertToTime(new Date() - this.initMillis);
    }, 10);
  },

  stop() {
    this.state = 'stop';
    this.initMillis = new Date() - this.initMillis;
    $playButton.textContent = 'Start';
    $resetButton.textContent = 'Reset';
  },

  getLaps() {
    [...$laps.children].forEach($lap => {
      if ($lap.matches('.lap-title')) $lap.style.display = 'grid';
    });

    this.laps = [...this.laps, new Date() - this.initMillis];

    const $el = document.createDocumentFragment();

    $laps.appendChild($el);
    const $divEl = document.createElement('div');
    $divEl.innerHTML = `<div>${this.laps.length}</div>`;
    const $divEl2 = document.createElement('div');
    $divEl2.innerHTML = `<div>${convertToTime(this.laps.at(-1))}</div>`;

    $el.appendChild($divEl);
    $el.appendChild($divEl2);

    $laps.appendChild($el);
  }
};

// Event Binding------------
$playButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.start() : Stopwatch.stop();
};

$resetButton.onclick = () => {
  Stopwatch.state === 'stop' ? Stopwatch.reset() : Stopwatch.getLaps();
};

window.addEventListener('DOMContentLoaded', () => {
  initLaps();

  $resetButton.disabled = true;
});
