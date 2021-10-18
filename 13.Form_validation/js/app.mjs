import auth from './auth.mjs';
import toaster from './toaster.mjs';
// Constant Numbers ----------------------------------------------
const WAIT_BEFORE_RUNNING = 300;

// Functions ------------------------------------------------------
const isValidInput = (inputType, inputValue) =>
  auth[inputType].checker(inputValue);

const inputCompleteCheck = targetInputElements =>
  targetInputElements
    .map($inputElement => auth[$inputElement.name].completed)
    .every(completed => completed);

const setCompletedOfAuth = (eventTarget, isCompleted) => {
  const inputType = eventTarget.name;

  auth[inputType].completed = isCompleted;

  const $error = eventTarget.parentNode.querySelector('.error');

  isCompleted
    ? ($error.textContent = '')
    : ($error.textContent = auth[inputType].alert);
};

const checkUserData = eventTarget => {
  const [inputType, inputValue] = [eventTarget.name, eventTarget.value];

  setCompletedOfAuth(eventTarget, isValidInput(inputType, inputValue));

  const $icons = eventTarget.parentNode.querySelectorAll('.icon');

  [...$icons].forEach(({ classList }) => {
    classList.contains('icon-error')
      ? classList.toggle('hidden', auth[eventTarget.name].completed)
      : classList.toggle('hidden', !auth[eventTarget.name].completed);
  });

  const $targetForm = eventTarget.closest('.form');
  const $button = $targetForm.querySelector('button');

  inputCompleteCheck([...$targetForm.querySelectorAll('input')])
    ? ($button.disabled = false)
    : ($button.disabled = true);
};

// Event bindings --------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflowX = 'hidden';
});

window.onkeyup = _.debounce(e => {
  if (!e.target.matches('input')) return;
  checkUserData(e.target);
}, WAIT_BEFORE_RUNNING);

window.onclick = e => {
  if (!e.target.matches('.link') && !e.target.matches('a')) return;

  [...document.forms].forEach($form => $form.toggleAttribute('hidden'));
};

window.onsubmit = e => {
  e.preventDefault();

  const $targetForm = e.target.closest('.form');

  if (!inputCompleteCheck([...$targetForm.querySelectorAll('input')])) return;

  toaster.add({ message: `${$targetForm.classList[1]} Successfully` });

  auth.getUserInfo($targetForm.classList[1]);
};
