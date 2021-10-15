// DOM Nodes
const $tabs = document.querySelector('.tabs');
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
      ({ title }, index) =>
        `<div class="tab" data-index="${index + 1}">${title}</div>`
    )
    .join('')} 
    <span class="glider"></span>`;
  return $navEl;
};

const createTabContent = tabContent =>
  tabContent.map(({ content }, i) => {
    const $div = document.createElement('div');
    if (i === 0) {
      $div.classList.add('tab-content', 'active');
    } else {
      $div.classList.add('tab-content');
    }
    $div.appendChild(document.createTextNode(content));
    return $div;
  });

const render = domEls => {
  const $tabs = document.querySelector('.tabs');
  domEls.forEach(domEl => {
    $tabs.appendChild(domEl);
  });
  $tabs.style.setProperty('--tabs-length', domEls.length - 1);
};

const beActiveTabContent = index => {
  const $tabContents = document.querySelectorAll('.tab-content');
  const $glider = document.querySelector('.glider');
  [...$tabContents].forEach((content, idx) => {
    +index === idx + 1
      ? content.classList.add('active')
      : content.classList.remove('active');
  });

  $glider.style.setProperty('left', `calc(var(--tab-width) * ${index - 1}px`);
};

// Event binding
window.addEventListener(
  'DomContentLoaded',
  fetchTabsData().then(resolve => {
    document.querySelector('.spinner').style.opacity = '0';
    render([createNav(resolve), ...createTabContent(resolve)]);
    const $nav = document.querySelector('nav');
    $nav.onclick = e => {
      beActiveTabContent(e.target.dataset.index);
    };
  })
);
