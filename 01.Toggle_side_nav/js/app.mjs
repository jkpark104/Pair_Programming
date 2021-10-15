// DOM Nodes--------------------
const $nav = document.querySelector('.container nav');
const $main = document.querySelector('.container main');
const $toggle = document.querySelector('.toggle');

// Function----------------------
const setNavState = newState => {
  localStorage.setItem('isNavFolded', newState);
};

const getNavState = () => JSON.parse(localStorage.getItem('isNavFolded'));

const slideNavigation = isNavFolded => {
  $nav.classList.toggle('active', isNavFolded);
};

const initNavState = () => {
  [$main, $nav, $toggle].forEach($el => $el.classList.add('notransition'));

  if (!getNavState()) setNavState(false);

  slideNavigation(getNavState());
};

const toggleNavState = () => {
  setNavState(!getNavState());

  slideNavigation(getNavState());
};

// // Event bindings -------------------
window.addEventListener('DOMContentLoaded', initNavState);

window.onload = () => {
  [$main, $nav, $toggle].forEach($el => $el.classList.remove('notransition'));
};

$toggle.onclick = toggleNavState;
