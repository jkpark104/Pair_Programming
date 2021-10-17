// DOM Nodes--------------------
const $toggleBtn = document.querySelector('.toggle-button');
const $body = document.querySelector('body');

let isDarkMode = false;

const getMode = () => JSON.parse(localStorage.getItem('isDarkMode'));
const toggleMode = isDarkMode => $body.classList.toggle('dark', isDarkMode);

// Event bindings -------------------

window.addEventListener('DOMContentLoaded', () => {
  getMode()
    ? (isDarkMode = getMode())
    : localStorage.setItem('isDarkMode', isDarkMode);

  toggleMode(isDarkMode);

  const EXECUTE_AFTER_MILLISECOND = 300;

  setTimeout(() => {
    $body.style.opacity = '1';
  }, EXECUTE_AFTER_MILLISECOND);
});

$toggleBtn.onclick = () => {
  isDarkMode = !getMode();
  localStorage.setItem('isDarkMode', isDarkMode);
  toggleMode(isDarkMode);
};
