const $carousel = document.querySelector('.carousel');

const MOVE_BACKWARD = -1;
const MOVE_FORWARD = 1;

let transitionEnd = false;
let slideOrder = 1;

const whetherBothEnds = () =>
  slideOrder === 0 ||
  slideOrder === $carousel.querySelectorAll('img').length - 1;

const setCarouselProperty = properties => {
  Object.keys(properties).forEach(key => {
    $carousel.firstChild.style.setProperty(`--${key}`, properties[key]);
  });
};

// Functions-------------------------------
const carousel = ($container, images) => {
  const imageGroup = [images[images.length - 1], ...images, images[0]];

  $container.innerHTML = `
    <div class="carousel-slides">
      ${imageGroup.map(image => `<img src="${image}"></img>`).join('')}
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
    `.trim();

  $carousel.style.opacity = '1';
  setCarouselProperty({ currentSlide: 1, duration: 500 });
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);

window.onload = () => {
  const slideWidth = $carousel.firstElementChild.firstElementChild.clientWidth;
  $carousel.style.width = slideWidth + 'px';
};

const slideImage = backAndForth => {
  if (!whetherBothEnds()) setCarouselProperty({ duration: 500 });

  slideOrder += backAndForth;
  setCarouselProperty({ currentSlide: slideOrder });
};

$carousel.onclick = e => {
  if (!e.target.matches('button')) return;
  if (transitionEnd) return;

  transitionEnd = true;

  e.target.matches('.prev')
    ? slideImage(MOVE_BACKWARD)
    : slideImage(MOVE_FORWARD);
};

$carousel.ontransitionend = e => {
  if (!e.target.matches('.carousel-slides')) return;

  transitionEnd = false;

  if (!whetherBothEnds()) return;

  const slideLastIndex = $carousel.querySelectorAll('img').length - 1;
  slideOrder = Math.abs(slideOrder - slideLastIndex + 1);
  setCarouselProperty({ currentSlide: slideOrder, duration: 0 });
};
