import auth from './auth.mjs';
import toaster from './toaster.mjs';

const isValid = (inputType, inputValue) => auth[inputType].checker(inputValue);

const inputCompleteCheck = targetInputs =>
  targetInputs
    .map($input => auth[$input.name].completed)
    .every(completed => completed === true);

const setCompletedOfAuth = (eventTarget, isCompleted) => {
  const inputType = eventTarget.name;

  auth[inputType].completed = isCompleted;

  const $bar = eventTarget.parentNode.querySelector('.bar');

  isCompleted
    ? ($bar.textContent = '')
    : ($bar.textContent = auth[inputType].alert);
};

const checkUserInfo = eventTarget => {
  const [inputType, inputValue] = [eventTarget.name, eventTarget.value];

  setCompletedOfAuth(eventTarget, isValid(inputType, inputValue));

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

window.onkeyup = e => {
  if (!e.target.matches('input')) return;

  checkUserInfo(e.target);
};

window.onclick = e => {
  if (!e.target.matches('.link') && !e.target.matches('a')) return;

  [...document.forms].forEach($form => $form.toggleAttribute('hidden'));
};

window.onsubmit = e => {
  e.preventDefault();

  const $targetForm = e.target.closest('.form');

  if (!inputCompleteCheck([...$targetForm.querySelectorAll('input')])) return;

  console.log(auth.getUserInfo());
  toaster.add({ message: `${$targetForm.classList[1]} Successfully` });
};
