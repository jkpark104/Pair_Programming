// Functions-------------------------------
const carousel = ($container, images) => {
  $container.innerHTML = `<div class="carousel-slides">
  ${[images[images.length - 1], ...images, images[0]]
    .map(image => `<img src="${image}"></img>`)
    .join('')}
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
    `;
  const $div = $container.firstElementChild;
  $div.style.setProperty('--currentSlide', '1');
  $div.style.setProperty('--duration', '500');
  $div.firstElementChild.onload = () => {
    $container.style.width = `${$div.firstElementChild.scrollWidth}px`;
  };
  $container.style.opacity = '1';

  const [$buttonPrevEl, $buttonNextEl] = document.querySelectorAll('button');
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
