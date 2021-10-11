// DOM Nodes--------------------
const $nav = document.querySelector('.container nav');
const $toggle = document.querySelector('.toggle');
let state = false;

const setStatus = newState => {
  localStorage.setItem('toggleStatus', newState);
};
const getStatus = () => localStorage.getItem('toggleStatus');

const toggleNavigation = state => $nav.classList.toggle('active', state);

// Event bindings -------------------
window.addEventListener('DOMContentLoaded', () => {
  getStatus() ? (state = JSON.parse(getStatus())) : setStatus(state);
  toggleNavigation(state);
});

$toggle.onclick = () => {
  state = !JSON.parse(getStatus());
  setStatus(state);
  toggleNavigation(state);
};
