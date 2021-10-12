// DOM Nodes
const $togglePopup = document.querySelector('.toggle-popup');
const $modalContainerContainer = document.querySelector(
  '.modal-container-container'
);
const $inputMessage = document.querySelector('.input-message');
const $buttonOk = document.querySelector('.button-ok');
const $buttonCancel = document.querySelector('.button-cancel');
const $buttonExit = document.querySelector('.button-exit');
const $popupMessage = document.querySelector('.popup-message');

// Event bindings
$togglePopup.onclick = () => {
  $modalContainerContainer.classList.toggle('active');
  $popupMessage.textContent = '';
};

$modalContainerContainer.onclick = e => {
  if (!e.target.classList.contains('modal-container-container')) return;
  $modalContainerContainer.classList.remove('active');
};

$buttonOk.onclick = () => {
  if ($inputMessage.value.trim() !== '') {
    $popupMessage.textContent = 'from popup : ' + $inputMessage.value.trim();
  }
  $inputMessage.value = '';
  $modalContainerContainer.classList.remove('active');
};

document.querySelector('.input-message').onkeyup = e => {
  if (e.key !== 'Enter') return;
  if ($inputMessage.value.trim() !== '') {
    $popupMessage.textContent = 'from popup : ' + $inputMessage.value.trim();
  }
  $inputMessage.value = '';
  $modalContainerContainer.classList.remove('active');
};

$buttonCancel.onclick = () => {
  $modalContainerContainer.classList.remove('active');
};

$buttonExit.onclick = () => {
  $modalContainerContainer.classList.remove('active');
};
