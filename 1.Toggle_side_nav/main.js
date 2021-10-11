const $nav = document.querySelector('.container nav');
const $toggle = document.querySelector('.toggle');

window.addEventListener('DOMContentLoaded', () => {
  localStorage.getItem('toggleStatus') === 'true'
    ? $nav.classList.add('active')
    : $nav.classList.remove('active');
});

$toggle.onclick = () => {
  if ($nav.classList.contains('active')) {
    localStorage.clear();
    localStorage.setItem('toggleStatus', false);
    $nav.classList.remove('active');
  } else {
    localStorage.clear();
    localStorage.setItem('toggleStatus', true);
    $nav.classList.add('active');
  }
};
