// DOM Nodes
const $accordion = document.querySelector('.accordion');
const $menuContainer = document.querySelectorAll('.menu-container');
const $subMenu = document.querySelectorAll('.submenu');

// $menuContainer[0].onclick = () => {
// active = !active;
// $subMenu[0].style.height = active ? `${$subMenu[0].scrollHeight}px` : '0';
// };

const toggleMenuContainer = idx => {
  // console.log($subMenu[idx]);
  // $subMenu[idx].classList.toggle('active');
  console.log($subMenu[idx]);
  // if ($subMenu[idx].style.height === '0')
  //   $subMenu[idx].style.height = `${$subMenu[idx].scrollHeight}px`;
  // else $subMenu[idx].style.height = '0';
};

$accordion.onclick = e => {
  // if ($subMenu[0].style.transition === 'none') {
  //   console.log('hi');
  //   $subMenu[0].style.transition = 'height 0.4s ease';
  // }
  if (!e.target.classList.contains('menu')) return;
  const text = e.target.textContent.trim();
  text === 'Front-end'
    ? toggleMenuContainer(0)
    : text === 'Responsive web'
    ? toggleMenuContainer(1)
    : toggleMenuContainer(2);
};

window.addEventListener('DOMContentLoaded', () => {
  // $subMenu[0].style.transition = 'none';
  $subMenu[0].style.setProperty('transition', 'none');
  $subMenu[0].style.height = `${$subMenu[0].scrollHeight}px`;
});
