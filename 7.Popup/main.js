// DOM Nodes
const $togglePopup = document.querySelector('.toggle-popup');
const $modalContainer = document.querySelector('.modal-container');
const $modalContainerContainer = document.querySelector(
  '.modal-container-container'
);
// Event bindings
$togglePopup.onclick = () => {
  $modalContainerContainer.classList.toggle('active');
};
