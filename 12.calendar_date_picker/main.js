// DOM Nodes
const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// state
const state = {
  month: new Date().getMonth(),
  year: new Date().getFullYear()
};

let dates = [];

// console.log(new Date(state.year, state.month).getDay());
// console.log(new Date(state.year, state.month, 0).getDate());

// Function
const format = n => (n < 10 ? '0' + n : n + '');

const convertDateFormat = date =>
  `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
    date.getDate()
  )}`;

const getDate = (year, month) => {
  const firstDayOfMonth = new Date(year, month).getDay();
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= firstDayOfMonth; i++) {
    const prevMonthDate = lastDateOfPrevMonth - firstDayOfMonth + i;
    const key = convertDateFormat(new Date(year, month - 1, prevMonthDate));
    dates.push({
      key,
      date: prevMonthDate,
      monthStatus: 'prev'
    });
  }

  const lastDateOfThisMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDateOfThisMonth; i++) {
    const key = new Date(year, month, i);
    dates.push({
      key: convertDateFormat(key),
      date: i,
      monthStatus: 'current',
      today: new Date().getDate() === i ? 'today' : '',
      sunday: key.getDay() === 0 ? 'sunday' : ''
    });
  }

  const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    const key = convertDateFormat(new Date(year, month + 1, i));
    dates.push({
      key,
      date: i,
      monthStatus: 'next'
    });
  }
};

// console.log(dates);

const render = () => {
  dates = [];
  getDate(state.year, state.month);
  $calendar.innerHTML = `
  <div class="calendar-nav">
    <h2 class="calendar-title">
      ${months[state.month]}<span>${state.year}</span>
    </h2>
    <button class="button btnPrev">◀</button>
    <button class="button btnNext">▶</button>
  </div>
  <div class="calendar-grid">
  <div class="week">
    ${daysOfWeek.map(day => `<div>${day}</div>`).join('')}
  </div>
  <div class="day">
      ${dates
        .map(
          ({ key, date, monthStatus, today, sunday }) => `
          <button class="${monthStatus === 'current' ? '' : monthStatus}${
            today ? 'is-selected' : ''
          }${sunday ? 'sunday' : ''}">
            <time datatime = "${key}"> ${date}</time> 
          </button>`
        )
        .join('')} 
    </div> 
  </div>`;
};

const changeMonth = indicator => {
  const date = new Date(state.year, state.month + indicator);
  state.year = date.getFullYear();
  state.month = date.getMonth();
  render();
};

const pickDate = el => {
  document.querySelector('.is-selected').classList.remove('is-selected');
  el.classList.add('is-selected');
};

// Event Binding
window.addEventListener('DOMContentLoaded', () => {
  render();
});

document.onclick = e => {
  if (e.target.classList.contains('btnNext')) changeMonth(1);
  else if (e.target.classList.contains('btnPrev')) changeMonth(-1);
  else if (e.target.matches('time')) pickDate(e.target.parentNode);
  else if (e.target.matches('button')) pickDate(e.target);
};

document.addEventListener('click', e => {
  if (
    e.target.closest('.day') ||
    e.target.closest('.calendar-nav') ||
    e.target.closest('.calendar-grid') ||
    e.target === $datePicker
  )
    return;
  $calendar.classList.remove('active');
});

$datePicker.onfocus = () => {
  $calendar.classList.add('active');
};
