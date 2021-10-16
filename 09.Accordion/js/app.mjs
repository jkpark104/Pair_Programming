// DOM Nodes
const $body = document.querySelector('body');
const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');
const $subMenus = document.querySelectorAll('.submenu');

const toggleMenuContainer = idx => {
  $menuContainers.forEach(($menuContainer, i) => {
    idx === i
      ? $menuContainer.classList.toggle('active')
      : $menuContainer.classList.remove('active');
  });

  $subMenus.forEach($subMenu => {
    $subMenu.parentNode.matches('.active')
      ? ($subMenu.style.height = `${$subMenu.scrollHeight}px`)
      : ($subMenu.style.height = 0);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  $body.style.opacity = '0';

  [...$subMenus].forEach($subMenu => {
    if ($subMenu.parentNode.matches('.active'))
      $subMenu.style.setProperty('height', `${$subMenu.scrollHeight}px`);
  });

  setTimeout(() => {
    $body.style.opacity = '1';
  }, 400);
});

$accordion.onclick = e => {
  if (!e.target.closest('div').matches('.menu')) return;

  toggleMenuContainer(
    [...$menuContainers].indexOf(e.target.closest('.menu-container'))
  );
};
