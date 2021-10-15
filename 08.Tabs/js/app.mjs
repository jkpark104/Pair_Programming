// DOM Nodes
const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');
// fetch fake data
// eslint-disable-next-line arrow-body-style
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });
};

const createNav = tabContent => {
  const $navEl = document.createElement('nav');

  $navEl.innerHTML = `${tabContent
    .map(
      ({ title }, i) => `<div class="tab" data-index="${i + 1}">${title}</div>`
    )
    .join('')} 
      <span class="glider"></span>`;

  return $navEl;
};

const createTabContent = tabContent =>
  tabContent.map(({ content }, i) => {
    const $divEl = document.createElement('div');

    i === 0
      ? $divEl.classList.add('tab-content', 'active')
      : $divEl.classList.add('tab-content');

    $divEl.innerHTML = content;

    return $divEl;
  });

const render = elments => {
  elments.forEach(element => {
    $tabs.appendChild(element);
  });
  $tabs.style.setProperty('--tabs-length', elments.length - 1);
};

const beActiveTabContent = (index, target) => {
  const tabContents = document.querySelectorAll('.tab-content');
  [...tabContents].forEach((el, i) =>
    el.classList.toggle('active', i + 1 === +index)
  );
  // [...navElments].forEach(el => {
  //   el.matches('.glider')
  //     ? el.style.setProperty('left', `calc(var(--tab-width) * ${index}px`)
  //     : el.classList.toggle('active', el === target);
  // });
};

// Event binding
window.addEventListener(
  'DomContentLoaded',
  fetchTabsData().then(resolve => {
    $spinner.style.opacity = '0';
    render([createNav(resolve), ...createTabContent(resolve)]);
  })
);

$tabs.onclick = e => {
  if (!e.target.matches('.tab')) return;

  beActiveTabContent(e.target.dataset.index, e.target);
};
