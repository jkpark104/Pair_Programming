// DOM Nodes --------------
const [$playButton, $resetButton] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');
const $display = document.querySelector('.display');
const startTime = new Date();

// function --------------
const getTime = ms => {
  const minute = Math.floor(ms / (1000 * 60));
  ms -= 1000 * 60 * minute;
  const second = Math.floor(ms / 1000);
  ms -= 1000 * second;
  return `${minute}:${second}:${ms}`;
};

const timer = () => {
  setInterval(() => {
    const now = new Date();
    $display.textContent = getTime(now - startTime);
  }, 10);
};

// let startTime = new Date();

// Event Listener
$playButton.onclick = () => {
  $playButton.textContent = 'Stop';
  $resetButton.textContent = 'Lap';
  $resetButton.disabled = false;
  timer();
};

// $resetButton.onclick = () => {};
// $laps.innerHTML = `
//   <div>1</div>
//   <div>00:00:65</div>
//   <div>2</div>
//   <div>00:01:21</div>
//   <div>3</div>
//   <div>00:03:95</div>
// `;
