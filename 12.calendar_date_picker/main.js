// DOM Nodes
const $calendar = document.querySelector('.calendar');

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

const dates = [];

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
      monthStatus: 'prev'
    });
  }

  const lastDateOfThisMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDateOfThisMonth; i++) {
    const key = new Date(year, month, i);
    dates.push({
      key: convertDateFormat(key),
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
      monthStatus: 'next'
    });
  }
};

getDate(state.year, state.month);
console.log(dates);

const render = () => {};

const changeMonth = indicator => {
  const date = new Date(state.year, state.month + indicator);
  state.year = date.getFullYear();
  state.month = date.getMonth();
  render();
};

// Event Binding
window.addEventListener('DOMContentLoaded', () => {
  render();
});

document.onclick = e => {
  if (e.target.classList.contains('btnNext')) changeMonth(1);
  else if (e.target.classList.contains('btnPrev')) changeMonth(-1);
};
