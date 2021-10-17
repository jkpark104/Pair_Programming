// DOM Nodes
const $body = document.querySelector('body');
const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');
const $subMenus = document.querySelectorAll('.submenu');

const toggleMenuContainer = target => {
  $menuContainers.forEach(($menuContainer, i) => {
    target === i
      ? $menuContainer.classList.toggle('active')
      : $menuContainer.classList.remove('active');
  });

  $subMenus.forEach($subMenu => {
    $subMenu.parentNode.matches('.active')
      ? ($subMenu.style.height = $subMenu.scrollHeight + 'px')
      : ($subMenu.style.height = 0);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  $body.style.opacity = '0';

  [...$subMenus].forEach($subMenu => {
    if ($subMenu.parentNode.matches('.active'))
      $subMenu.style.height = $subMenu.scrollHeight + 'px';
  });

  const EXECUTE_AFTER_MILLISECOND = 400;

  setTimeout(() => {
    $body.style.opacity = '1';
  }, EXECUTE_AFTER_MILLISECOND);
});

$accordion.onclick = e => {
  if (!e.target.closest('div').matches('.menu')) return;

  toggleMenuContainer(
    [...$menuContainers].indexOf(e.target.closest('.menu-container'))
  );
};
