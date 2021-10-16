const $carousel = document.querySelector('.carousel');
let _isTransited = false;
let _currentIdx = 1;

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
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);

const slideImage = (carouselSlides, incDesc) => {
  if (_currentIdx === 1 || _currentIdx === 4)
    carouselSlides.style.setProperty('--duration', '500');
  _currentIdx += incDesc;
  carouselSlides.style.setProperty('--currentSlide', _currentIdx);
};

$carousel.onclick = e => {
  if (!e.target.matches('button')) return;
  if (_isTransited) return;

  _isTransited = true;

  e.target.matches('.prev')
    ? slideImage(e.target.parentNode.firstChild, -1)
    : slideImage(e.target.parentNode.firstChild, 1);
};

$carousel.addEventListener('transitionend', e => {
  if (!e.target.matches('.carousel-slides')) return;

  if (+e.target.style.getPropertyValue('--currentSlide') === 0) {
    e.target.style.setProperty('--duration', '0');
    e.target.style.setProperty('--currentSlide', '4');
    _currentIdx = 4;
  } else if (+e.target.style.getPropertyValue('--currentSlide') === 5) {
    e.target.style.setProperty('--duration', '0');
    e.target.style.setProperty('--currentSlide', '1');
    _currentIdx = 1;
  }
  _isTransited = false;
});
