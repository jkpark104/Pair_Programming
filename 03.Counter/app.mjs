// DOM Nodes ----------------
const $increaseButton = document.querySelector('.increase');
const $counter = document.querySelector('.counter');
const $decreaseButton = document.querySelector('.decrease');

// function------------------
const countingStatus = (function () {
  let num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    }
  };
})();

// Event binding -------------------
$increaseButton.onclick = () => {
  $counter.textContent = countingStatus.increase();
};
$decreaseButton.onclick = () => {
  $counter.textContent = countingStatus.decrease();
};
