// DOM Nodes --------------
const $hour = document.querySelector('.hand.hour');
const $minute = document.querySelector('.hand.minute');
const $second = document.querySelector('.hand.second');

// Function------------------------
const timeCalculate = () => {
  const today = new Date();

  const hour = today.getHours() % 12;
  const minute = today.getMinutes();
  const second = today.getSeconds();

  $hour.style.setProperty('--deg', 30 * hour + 0.5 * minute);
  $minute.style.setProperty('--deg', 6 * minute + 0.1 * second);
  $second.style.setProperty('--deg', 6 * second);

  setTimeout(timeCalculate, 1000);
};

// Event Binding------------------
window.addEventListener('DOMContentLoaded', timeCalculate);
