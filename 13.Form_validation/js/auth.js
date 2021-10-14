const $signInUserId = document.getElementById('signin-userid');
const $signInPassword = document.getElementById('signin-password');
const $signInButton = document.querySelector('.signin button');

let isValidId = false;
let isValidPw = false;

const idChecker = id =>
  /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    id
  );

const passwordChecker = pw => {
  if (pw.length > 12 || pw.length < 6) return false;
  return /[A-Za-z0-9]{6,12}/.test(pw);
};

$signInUserId.onkeyup = e => {
  const $icons = [...e.target.parentNode.children].filter(el =>
    el.classList.contains('icon')
  );
  const isValid = idChecker(e.target.value.trim());
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
