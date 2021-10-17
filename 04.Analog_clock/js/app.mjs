// DOM Nodes --------------
const [$hour, $minute, $second] = document.querySelectorAll('.hand');

// Function------------------------
const timeCalculate = () => {
  const today = new Date();

  const hour = today.getHours() % 12;
  const minute = today.getMinutes();
  const second = today.getSeconds();

  const ANGLE_OF_HOUR_HAND = 30 * hour + 0.5 * minute;
  const ANGLE_OF_MINUTE_HAND = 6 * minute + 0.1 * second;
  const ANGLE_OF_SECOND_HAND = 6 * second;

  $hour.style.setProperty('--deg', ANGLE_OF_HOUR_HAND);
  $minute.style.setProperty('--deg', ANGLE_OF_MINUTE_HAND);
  $second.style.setProperty('--deg', ANGLE_OF_SECOND_HAND);

  const EXECUTE_AFTER_MILLISECOND = 1000;

  setTimeout(timeCalculate, EXECUTE_AFTER_MILLISECOND);
};

// Event Binding------------------
window.addEventListener('DOMContentLoaded', timeCalculate);
