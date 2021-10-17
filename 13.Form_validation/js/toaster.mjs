const $body = document.querySelector('body');

const createToast = ({ message }) => {
  const $toast = document.createElement('div');
  $toast.classList.add('toast', 'toast-success');

  $toast.innerHTML = `
        <h4 class="toast-heading">Well done!</h4>
        <div class="toast-message">
          <svg width="24" height="24">
            <use xlink:href="#success" />
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

export default toaster;
