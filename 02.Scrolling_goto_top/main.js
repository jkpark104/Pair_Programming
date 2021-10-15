const $scrollIcon = document.querySelector('.scroll-icon');

const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

window.onscroll = throttle(() => {
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
