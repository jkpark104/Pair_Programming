// DOM Nodes
const $accordion = document.querySelector('.accordion');
const $menuContainer = document.querySelectorAll('.menu-container');
const $subMenu = document.querySelectorAll('.submenu');
const active = [true, false, false];

// $menuContainer[0].onclick = () => {
// active = !active;
// $subMenu[0].style.height = active ? `${$subMenu[0].scrollHeight}px` : '0';
// };

const toggleMenuContainer = idx => {
  // console.log($subMenu[idx]);
  // $subMenu[idx].classList.toggle('active');
  // console.log($subMenu[idx]);
  // if ($subMenu[idx].style.height === '0')
  // console.log($subMenu[idx].style.height);
  // else console.log($subMenu[idx].style.height);
  // $subMenu[idx].style.height = `${$subMenu[idx].scrollHeight}px`;
  // else $subMenu[idx].style.height = '0';
  // active[idx] = !active[idx];
  // $subMenu[idx].style.height = active[idx]
  //   ? `${$subMenu[idx].scrollHeight}px`
  //   : '0';
  // [...$menuContainer].forEach(ele => {
  //   console.log(ele.style);
  // });
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
  // $subMenu[0].style.
  $subMenu[0].style.setProperty('transition-duration', '0s');
  $subMenu[0].style.height = `${$subMenu[0].scrollHeight}px`;
});
