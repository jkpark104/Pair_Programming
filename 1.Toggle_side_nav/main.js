// DOM Nodes--------------------
const $nav = document.querySelector('.container nav');
const $toggle = document.querySelector('.toggle');
let state = false;
// window.addEventListener('DOMContentLoaded', () => {
//   localStorage.getItem('toggleStatus') === 'true'
//     ? $nav.classList.add('active')
//     : $nav.classList.remove('active');
// });
// function ------------------------
const setStatus = newState => {
  localStorage.setItem('toggleStatus', newState);
};
const getStatus = () => localStorage.getItem('toggleStatus');

const toggleNavigation = state => $nav.classList.toggle('active', state);

// Event bindings -------------------
window.addEventListener('DOMContentLoaded', () => {
  // localStorage.clear();
  getStatus() ? (state = getStatus()) : setStatus(state);
  toggleNavigation(state);
});

$toggle.onclick = () => {};
// $toggle.onclick = () => {
//   if ($nav.classList.contains('active')) {
//     localStorage.clear();
//     localStorage.setItem('toggleStatus', false);
//     $nav.classList.remove('active');
//   } else {
//     localStorage.clear();
//     localStorage.setItem('toggleStatus', true);
//     $nav.classList.add('active');
//   }
// };
