const carousel = ($container, images) => {
  const $div = document.createElement('div');
  $div.classList.add('carousel-slides');
  const imageDOM = images.map(image => `<img src="${image}">`);
  $div.innerHTML = [imageDOM[images.length - 1], ...imageDOM, imageDOM[0]].join(
    ''
  );
  $container.appendChild($div);

  const $buttonPrevEl = document.createElement('button');
  const $buttonNextEl = document.createElement('button');
  $buttonPrevEl.classList.add('carousel-control', 'prev');
  $buttonPrevEl.innerHTML = '&laquo;';
  $buttonNextEl.classList.add('carousel-control', 'next');
  $buttonNextEl.innerHTML = '&raquo;';
  $container.appendChild($buttonPrevEl);
  $container.appendChild($buttonNextEl);
  $div.style.setProperty('--currentSlide', '1');
  $div.style.setProperty('--duration', '500');

  $div.children[0].onload = () => {
    $container.style.setProperty('width', `${$div.children[0].scrollWidth}px`);
  };

  $container.style.setProperty('opacity', '1');

  let currentIdx = 1;
  let isTransited = false;

  $div.addEventListener('transitionend', () => {
    if (currentIdx === 0) {
      currentIdx = $div.children.length - 1;
      $div.style.setProperty('--duration', '0.1');
      $div.style.setProperty('--currentSlide', --currentIdx);
      setTimeout(() => {
        $div.style.setProperty('--duration', '500');
        isTransited = false;
      }, 0.001);
    } else if (currentIdx === $div.children.length - 1) {
      currentIdx = 0;
      $div.style.setProperty('--duration', '0.1');
      $div.style.setProperty('--currentSlide', ++currentIdx);
      setTimeout(() => {
        $div.style.setProperty('--duration', '500');
        isTransited = false;
      }, 0.001);
    } else {
      isTransited = false;
    }
  });

  $buttonPrevEl.onclick = () => {
    if (isTransited) return;
    isTransited = true;
    $div.style.setProperty('--currentSlide', --currentIdx);
  };

  $buttonNextEl.onclick = () => {
    if (isTransited) return;
    isTransited = true;
    $div.style.setProperty('--currentSlide', ++currentIdx);
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
