// DOM Nodes--------------------
const $scrollIcon = document.querySelector('.scroll-icon');

// Event Binding----------------
window.onscroll = _.throttle(() => {
  window.pageYOffset > 300
    ? ($scrollIcon.style.display = 'block')
    : ($scrollIcon.style.display = 'none');
}, 100);

$scrollIcon.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
