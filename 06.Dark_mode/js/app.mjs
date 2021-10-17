// Constant Numbers
const TRANSITION_DURATION = 300;

// DOM Nodes--------------------
const $toggleBtn = document.querySelector('.toggle-button');
const $body = document.querySelector('body');

// Variables
let isDarkMode = false;

// Functions--------------------
const getModeState = () => JSON.parse(localStorage.getItem('isDarkMode'));

const changeMode = isDarkMode => $body.classList.toggle('dark', isDarkMode);

// Event bindings -------------------
window.addEventListener('DOMContentLoaded', () => {
  getModeState()
    ? (isDarkMode = getModeState())
    : localStorage.setItem('isDarkMode', isDarkMode);

  changeMode(isDarkMode);

  setTimeout(() => {
    $body.style.opacity = '1';
  }, TRANSITION_DURATION);
});

$toggleBtn.onclick = () => {
  isDarkMode = !getModeState();

  localStorage.setItem('isDarkMode', isDarkMode);

  changeMode(isDarkMode);
};
