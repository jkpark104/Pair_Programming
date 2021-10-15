// DOM Nodes ----------------
const $increase = document.querySelector('.increase');
const $counter = document.querySelector('.counter');
const $decrease = document.querySelector('.decrease');

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
$increase.onclick = () => {
  $counter.textContent = countingStatus.increase();
};
$decrease.onclick = () => {
  $counter.textContent = countingStatus.decrease();
};
