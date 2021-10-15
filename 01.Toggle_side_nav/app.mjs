import { setNavState, getNavState } from './localStroage.mjs';

// DOM Nodes--------------------
const $nav = document.querySelector('.container nav');
const $main = document.querySelector('.container main');
const $toggle = document.querySelector('.toggle');

const slideNavigation = isNavFolded => {
  $nav.classList.toggle('active', isNavFolded);
};

const initNavState = () => {
  [$main, $nav, $toggle].forEach($el => $el.classList.add('notransition'));

  if (!getNavState()) setNavState(false);

  slideNavigation(getNavState());

  setTimeout(() => {
    [$main, $nav, $toggle].forEach($el => $el.classList.remove('notransition'));
  }, 0.1);
};

const toggleNavState = () => {
  setNavState(!getNavState());

  slideNavigation(getNavState());
};

// // Event bindings -------------------
window.addEventListener('DOMContentLoaded', initNavState);

$toggle.onclick = toggleNavState;
