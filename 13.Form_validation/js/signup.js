// 돔
const $signUpUserId = document.getElementById('signup-userid');
const $signUpPassword = document.getElementById('signup-password');
const $signUpName = document.getElementById('signup-name');
const $signUpConfirmPassword = document.getElementById(
  'signup-confirm-password'
);
const $signUpButton = document.querySelector('.signup button');
const $signUpForm = document.forms[1];

let isValidId = false;
let isValidName = false;
let isValidPw = false;
let isValidConfirmPw = false;

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

const alertNameError = (idx, valid) => {
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
    '이름을 입력해 주세요.';
};

const alertPwError = (idx, valid) => {
  if (!valid) {
    document.forms[idx].querySelectorAll('.bar')[2].textContent = '';
    return;
  }
  document.forms[idx]
    .querySelectorAll('.bar')[2]
    .style.setProperty('font-size', '12px');
  document.forms[idx]
    .querySelectorAll('.bar')[2]
    .style.setProperty('color', 'red');
  document.forms[idx].querySelectorAll('.bar')[2].textContent =
    '영문 또는 숫자를 6~12자 입력하세요.';
};

const alertPwCofirmError = (idx, valid) => {
  if (!valid) {
    document.forms[idx].querySelectorAll('.bar')[3].textContent = '';
    return;
  }
  document.forms[idx]
    .querySelectorAll('.bar')[3]
    .style.setProperty('font-size', '12px');
  document.forms[idx]
    .querySelectorAll('.bar')[3]
    .style.setProperty('color', 'red');
  document.forms[idx].querySelectorAll('.bar')[3].textContent =
    '패스워드가 일치하지 않습니다';
};
const idChecker = id =>
  /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    id
  );
const nameChecker = name => name.length >= 1;

const passwordChecker = pw => {
  if (pw.length > 12 || pw.length < 6) return false;
  return /[A-Za-z0-9]{6,12}/.test(pw);
};

const passwordConfirmChecker = pw => pw === $signUpPassword.value.trim();
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
$signUpUserId.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = idChecker(e.target.value.trim());
  if (!isValid) alertIdError(1, true);
  else alertIdError(1, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidId = true) : (isValidId = false);
  isValidId && isValidPw && isValidName && isValidConfirmPw
    ? ($signUpButton.disabled = false)
    : ($signUpButton.disabled = true);
};

$signUpPassword.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = passwordChecker(e.target.value.trim());
  if (!isValid) alertPwError(1, true);
  else alertPwError(1, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidPw = true) : (isValidPw = false);
  isValidId && isValidPw && isValidName && isValidConfirmPw
    ? ($signUpButton.disabled = false)
    : ($signUpButton.disabled = true);
};

$signUpName.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = nameChecker(e.target.value.trim());
  if (!isValid) alertNameError(1, true);
  else alertNameError(1, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidName = true) : (isValidName = false);
  isValidId && isValidPw && isValidName && isValidConfirmPw
    ? ($signUpButton.disabled = false)
    : ($signUpButton.disabled = true);
};

$signUpConfirmPassword.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = passwordConfirmChecker(e.target.value.trim());
  if (!isValid) alertPwCofirmError(1, true);
  else alertPwCofirmError(1, false);
  $icons.forEach(icon =>
    icon.matches('.icon-success')
      ? icon.classList.toggle('hidden', !isValid)
      : icon.classList.toggle('hidden', isValid)
  );
  isValid ? (isValidConfirmPw = true) : (isValidConfirmPw = false);
  isValidId && isValidPw && isValidName && isValidConfirmPw
    ? ($signUpButton.disabled = false)
    : ($signUpButton.disabled = true);
};

$signUpForm.onsubmit = e => {
  e.preventDefault();
  toaster.add(
    createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'SignUp Successfully')
  );
};
