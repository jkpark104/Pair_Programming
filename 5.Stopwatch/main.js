// DOM Nodes --------------
const [$playButton, $resetButton] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');
const $display = document.querySelector('.display');
const startTime = new Date();
let intervalController = null;

// function --------------
const getTime = ms => {
  let _ms = ms;
  const minute = Math.floor(_ms / (1000 * 60));
  _ms -= 1000 * 60 * minute;
  const second = Math.floor(_ms / 1000);
  _ms -= 1000 * second;
  const format = n => (n < 10 ? '0' + n : n + '');
  return `${format(minute)}:${format(second)}:${format(Math.floor(_ms / 10))}`;
};

const timer = () => {
  const now = new Date();
  $display.textContent = getTime(now - startTime);
};

// let startTime = new Date();

// Event Binding
$playButton.onclick = () => {
  $playButton.textContent = 'Stop';
  $resetButton.textContent = 'Lap';
  $resetButton.disabled = false;
  intervalController = setInterval(timer, 10);
};

$resetButton.onclick = () => {
  clearInterval(intervalController);
};
// $laps.innerHTML = `
//   <div>1</div>
//   <div>00:00:65</div>
//   <div>2</div>
//   <div>00:01:21</div>
//   <div>3</div>
//   <div>00:03:95</div>
// `;
