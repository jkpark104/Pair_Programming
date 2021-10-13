// DOM Nodes
const $accordion = document.querySelector('.accordion');
const $menuContainer = document.querySelectorAll('.menu-container');
const $subMenu = document.querySelectorAll('.submenu');

const toggleMenuContainer = idx => {
  [...$subMenu].forEach((subMneuEl, i) => {
    if (idx === +i) {
      if (subMneuEl.style.height.trim().length < 4) {
        $menuContainer[i].classList.add('active');
        subMneuEl.style.height = `${$subMenu[idx].scrollHeight}px`;
      } else {
        $menuContainer[i].classList.remove('active');
        subMneuEl.style.height = '0';
      }
    } else {
      $menuContainer[i].classList.remove('active');
      subMneuEl.style.height = '0';
    }
  });
};

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;
  if ($subMenu[0].style.getPropertyValue('transition-duration')) {
    $subMenu[0].style.removeProperty('transition-duration');
  }

  const text = e.target.textContent.trim();
  text === 'Front-end'
    ? toggleMenuContainer(0)
    : text === 'Responsive web'
    ? toggleMenuContainer(1)
    : toggleMenuContainer(2);
};

window.addEventListener('DOMContentLoaded', () => {
  $subMenu[0].style.setProperty('transition-duration', '0s');
  $subMenu[0].style.height = `${$subMenu[0].scrollHeight}px`;
});
