// 돔
const $signInUserId = document.getElementById('signin-userid');
const $signInPassword = document.getElementById('signin-password');
const $signInButton = document.querySelector('.signin button');
const $signInForm = document.forms[0];
// const $signUpForm = document.forms[1];

let isValidId = false;
let isValidPw = false;

// 함수
const alertIdError = (idx, valid) => {
  if (!valid) {
    document.forms[idx].querySelectorAll('.bar')[0].textContent = '';
    return;
  }
  document.forms[idx]
    .querySelectorAll('.bar')[0]
    .style.setProperty('font-size', '12px');
  document.forms[idx]
    .querySelectorAll('.bar')[0]
    .style.setProperty('color', 'red');
  document.forms[idx].querySelectorAll('.bar')[0].textContent =
    '이메일 형식에 맞게 입력해 주세요.';
};

const alertPwError = (idx, valid) => {
  if (!valid) {
    document.forms[idx].querySelectorAll('.bar')[1].textContent = '';
    return;
  }
  document.forms[idx]
    .querySelectorAll('.bar')[1]
    .style.setProperty('font-size', '12px');
  document.forms[idx]
    .querySelectorAll('.bar')[1]
    .style.setProperty('color', 'red');
  document.forms[idx].querySelectorAll('.bar')[1].textContent =
    '영문 또는 숫자를 6~12자 입력하세요.';
};

const idChecker = id =>
  /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    id
  );

const passwordChecker = pw => {
  if (pw.length > 12 || pw.length < 6) return false;
  return /[A-Za-z0-9]{6,12}/.test(pw);
};

// 토스터
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

// 이벤트 바인딩
$signInUserId.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = idChecker(e.target.value.trim());
  if (!isValid) alertIdError(0, true);
  else alertIdError(0, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidId = true) : (isValidId = false);
  isValidId && isValidPw
    ? ($signInButton.disabled = false)
    : ($signInButton.disabled = true);
};

$signInPassword.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = passwordChecker(e.target.value.trim());
  if (!isValid) alertPwError(0, true);
  else alertPwError(0, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidPw = true) : (isValidPw = false);
  isValidId && isValidPw
    ? ($signInButton.disabled = false)
    : ($signInButton.disabled = true);
};

$signInForm.onsubmit = e => {
  e.preventDefault();
  toaster.add(
    createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'Signin Successfully')
  );
};
