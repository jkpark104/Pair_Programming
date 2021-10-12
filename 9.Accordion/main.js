// DOM Nodes
const $menuContainer = document.querySelectorAll('.menu-container');
let active = false;
$menuContainer[0].onclick = () => {
  active = !active;
  console.log(`${$menuContainer[0].scrollHeight}px`);
  $menuContainer[0].style.height = active
    ? `${$menuContainer[0].scrollHeight}px`
    : '0';
};
