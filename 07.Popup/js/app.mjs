// DOM Nodes
const $togglePopup = document.querySelector('.toggle-popup');
const $modalContainer = document.querySelector('.modal-container');
const $modal = document.querySelector('.modal');
const $inputMessage = document.querySelector('.input-message');
const $popupMessage = document.querySelector('.popup-message');

// 함수
const inputMessageToPopUp = message => {
  if (message !== '') {
    $popupMessage.textContent = 'from popup : ' + $inputMessage.value.trim();
  }

  $inputMessage.value = '';
};

// Event bindings
$togglePopup.onclick = () => {
  $popupMessage.textContent = '';

  $modalContainer.classList.add('active');
};

$modalContainer.onclick = e => {
  if (!e.target.classList.contains('modal-container')) return;

  $modalContainer.classList.remove('active');
};

$modal.onclick = e => {
  if (!e.target.matches('.button')) return;

  if (e.target.matches('.button-ok'))
    inputMessageToPopUp($inputMessage.value.trim());

  $modalContainer.classList.remove('active');
};

$inputMessage.onkeyup = e => {
  if (e.key !== 'Enter') return;

  inputMessageToPopUp($inputMessage.value.trim());

  $modalContainer.classList.remove('active');
};
