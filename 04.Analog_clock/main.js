// DOM Nodes --------------
const $second = document.querySelector('.hand.second');
const $minute = document.querySelector('.hand.minute');
const $hour = document.querySelector('.hand.hour');

// function --------------
(function printNow() {
  const today = new Date();
  let hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  hour %= 12;
  hour = hour || 12;

  $hour.style.setProperty('--deg', 30 * hour);
  $minute.style.setProperty('--deg', 6 * minute);
  $second.style.setProperty('--deg', 6 * second);

  setTimeout(printNow, 1000);
})();
