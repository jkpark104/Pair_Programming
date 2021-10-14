const $signInUserId = document.getElementById('signin-userid');
const $signInPassword = document.getElementById('signin-password');
const $iconSuccess = document.querySelector('.icon-success');
const $iconError = document.querySelector('.icon-error');

const idChecker = id =>
  /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
    id
  );

const passwordChecker = pw => {
  if (pw.length > 12 || pw.length < 6) return false;
  /[A-Za-z0-9]{6,12}/.test(pw);
};
$signInUserId.onkeyup = e => {
  $iconError.classList.toggle('hidden');
  if (e.key !== 'Enter') return;
  if (idChecker($signInUserId.value.trim())) {
    $iconSuccess.classList.toggle('hidden', !idChecker($signInUserId.value));
  }
  console.log(e.target.parentNode.children.getElementById());
};

$signInPassword.onkeyup = e => {
  $iconError.classList.toggle('hidden');
  if (e.key !== 'Enter') return;
  if (passwordChecker($signInPassword.value.trim())) {
    $iconSuccess.classList.toggle(
      'hidden',
      !passwordChecker($signInPassword.value)
    );
  }
};
