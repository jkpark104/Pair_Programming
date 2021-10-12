// DOM Nodes--------------------
// const $nav = document.querySelector('.container nav');
const $toggleBtn = document.querySelector('.toggle-button');
const $body = document.querySelector('body');
let state = false;

const setStatus = newState => {
  localStorage.setItem('toggleStatus', newState);
};
const getStatus = () => localStorage.getItem('toggleStatus');

const toggleMode = state => $body.classList.toggle('dark', state);

// Event bindings -------------------

window.addEventListener('load', () => {
  getStatus() ? (state = JSON.parse(getStatus())) : setStatus(state);
  toggleMode(state);
});
$toggleBtn.onclick = () => {
  state = !JSON.parse(getStatus());
  setStatus(state);
  toggleMode(state);
  // toggleNavigation(state);
};
