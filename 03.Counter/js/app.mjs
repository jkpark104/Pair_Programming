// DOM Nodes ----------------
const $increaseButton = document.querySelector('.increase');
const $counterDisplay = document.querySelector('.counter');
const $decreaseButton = document.querySelector('.decrease');

// Function------------------------
const counter = (function () {
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
  $counterDisplay.textContent = counter.increase();
};

$decreaseButton.onclick = () => {
  $counterDisplay.textContent = counter.decrease();
};
