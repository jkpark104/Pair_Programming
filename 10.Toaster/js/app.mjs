// <!--
// toast-success =>
// <div class="toast toast-success"">
//   <h4 class="toast-heading">Title</h4>
//   <div class="toast-message">
//     <svg width="24" height="24">
//       <use xlink:href="#success" />
//     </svg>
//     <p>Message</p>
//   </div>
//   <a class="close">&times;</a>
// </div>

// toast-error =>
// <div class="toast toast-error"">
//   <h4 class="toast-heading">Title</h4>
//   <div class="toast-message">
//     <svg width="24" height="24">
//       <use xlink:href="#error" />
//     </svg>
//     <p>Message</p>
//   </div>
//   <a class="close">&times;</a>
// </div>

// toast-warning =>
// <div class="toast toast-warning"">
//   <h4 class="toast-heading">Title</h4>
//   <div class="toast-message">
//     <svg width="24" height="24">
//       <use xlink:href="#warning" />
//     </svg>
//     <p>Message</p>
//   </div>
//   <a class="close">&times;</a>
// </div>
// -->
// DOM Nodes
const $body = document.querySelector('body');
$body.style.setProperty('overflow-x', 'hidden');

const toaster = {
  createDOM({ type, title, message }) {
    const $divEl = document.createElement('div');
    $divEl.classList.add('toast', `toast-${type}`);

    $divEl.innerHTML = `
          <h4 class="toast-heading">${title}</h4>
          <div class="toast-message">
            <svg width="24" height="24">
              <use xlink:href="#${type}" />
            </svg>
            <p>${message}</p>
          </div>
          <a class="close">&times;</a>`;
    return $divEl;
  },

  add(toastAction) {
    const $toast = this.createDOM(toastAction);
    document.querySelector('body').appendChild($toast);
    [...document.querySelectorAll('.toast')].forEach(
      (toastEl, index, thisArr) => {
        toastEl.style.setProperty(
          'bottom',
          `${(thisArr.length - (index + 1)) * 100}px`
        );
      }
    );
    setTimeout(() => this.remove($toast), 3000);
  },

  remove(toastEl) {
    toastEl.remove();
  }
};

// // $divEl.style.setProperty(
// //   `bottom`,
// //   document.querySelectorAll('.toast').length * 100 + 'px'
// // );

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
