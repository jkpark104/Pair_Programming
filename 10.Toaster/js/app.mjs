// DOM Nodes
const $body = document.querySelector('body');

const createToast = ({ type, title, message }) => {
  const $toast = document.createElement('div');
  $toast.classList.add('toast', `toast-${type}`);

  $toast.innerHTML = `
        <h4 class="toast-heading">${title}</h4>
        <div class="toast-message">
          <svg width="24" height="24">
            <use xlink:href="#${type}" />
          </svg>
          <p>${message}</p>
        </div>
        <a class="close">&times;</a>`;
  return $toast;
};

const toaster = {
  add(toastAction) {
    const $newToast = createToast(toastAction);
    $body.appendChild($newToast);

    const $toasts = [...document.querySelectorAll('.toast')];

    $toasts.forEach(($toast, index) => {
      $toast.style.bottom = `${($toasts.length - (index + 1)) * 100}px`;
    });

    setTimeout(() => $newToast.remove(), 3000);
  }
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const createToastAction = (type, title, message) => ({
  type,
  title,
  message
});

window.addEventListener('DOMContentLoaded', () => {
  $body.style.setProperty('overflow-x', 'hidden');
});

window.onclick = e => {
  if (!e.target.matches('.close')) return;

  e.target.closest('.toast').remove();
};

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.SUCCESS,
      'Well done!',
      'This is a success alert'
    )
  );

document.querySelector('.show-error').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.ERROR,
      'Check it out!',
      'This is a error alert'
    )
  );

document.querySelector('.show-warning').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.WARNING,
      'Check it out!',
      'This is a warning alert'
    )
  );
