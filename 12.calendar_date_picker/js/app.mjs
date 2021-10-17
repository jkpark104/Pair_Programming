// Constant Numbers ----------------------------------------
const MOVE_NEXT = 1;
const MOVE_PREV = -1;

// DOM Nodes --------------------------------------------
const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// state
const state = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  dates: [],
  pickedDate: null
};

// Function
const getMonthName = month =>
  new Date(0, month).toLocaleString('en-us', { month: 'long' });

const convertDateFormat = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const format = n => (n < 10 ? '0' + n : n + '');

  return `${year}-${format(month)}-${format(day)}`;
};

const createDate = ({ period, month, startDate }) =>
  Array.from({ length: period }, (_, index) => ({
    fullDate: convertDateFormat(new Date(state.year, month, startDate + index)),

    date: startDate + index,

    current: state.month === month ? 'current' : ''
  }));

const getDate = () => {
  const firstdayOfThisMonth = new Date(state.year, state.month).getDay();
  const lastDateOfPrevMonth = new Date(state.year, state.month, 0).getDate();

  const dateOfPrevMonth = createDate({
    period: firstdayOfThisMonth,
    month: state.month - 1,
    startDate: lastDateOfPrevMonth - firstdayOfThisMonth + 1
  });

  const lastdateOfThisMonth = new Date(
    state.year,
    state.month + 1,
    0
  ).getDate();

  const dateOfThisMonth = createDate({
    period: lastdateOfThisMonth,
    month: state.month,
    startDate: 1
  });

  const lastdayOfThisMonth = new Date(state.year, state.month + 1, 0).getDay();

  const dateOfNextMonth = createDate({
    period: 6 - lastdayOfThisMonth,
    month: state.month + 1,
    startDate: 1
  });

  return [...dateOfPrevMonth, ...dateOfThisMonth, ...dateOfNextMonth];
};

const render = () => {
  const today = convertDateFormat(new Date());

  state.dates = getDate(state.year, state.month).map((eachDate, index) => ({
    ...eachDate,
    sunday: !(index % 7) ? 'sunday' : '',
    today: eachDate.fullDate === today ? 'today' : '',
    selected: eachDate.fullDate === state.pickedDate ? 'selected' : ''
  }));

  const convertButtonToHTML = ({
    fullDate,
    date,
    current,
    sunday,
    today,
    selected
  }) =>
    `<button class="date-picker-icon ${current} ${sunday} ${today} ${selected}">
        <time datetime="${fullDate}">${date}</time>
     </button>`;

  $calendar.innerHTML = `
  <div class="calendar-nav">
    <h2 class="calendar-title">
      ${getMonthName(state.month)}<span>${state.year}</span>
    </h2>
    <button class="move-button btnPrev">◀</button>
    <button class="move-button btnNext">▶</button>
  </div>
  <div class="calendar-grid">
    <div class="week">
      ${daysOfWeek.map(day => `<div>${day}</div>`).join('')}
    </div>
    <div class="day">
      ${state.dates.map(convertButtonToHTML).join('')}
    </div> 
  </div>`;
};

const changeState = backAndForth => {
  const date = new Date(state.year, state.month + backAndForth);

  [state.year, state.month] = [date.getFullYear(), date.getMonth()];

  state.dates = getDate();

  render();
};

const changeMonth = target => {
  target.matches('.btnNext') ? changeState(MOVE_NEXT) : changeState(MOVE_PREV);
};

const pickDate = date => {
  state.pickedDate = date;
  state.dates = getDate();

  $datePicker.value = date;

  render();
};

// Event Binding
window.addEventListener('DOMContentLoaded', () => {
  state.dates = getDate();

  render();
});

window.onclick = e => {
  if (e.target.matches('.date-picker')) return;
  if (e.target.closest('.calendar')) return;
  if (e.target.closest('.calendar-nav')) return;

  $calendar.classList.remove('active');
};

$calendar.onclick = e => {
  if (!e.target.matches('.button') && !e.target.closest('button')) return;

  e.target.matches('.move-button')
    ? changeMonth(e.target)
    : pickDate(
        e.target.closest('.date-picker-icon').firstElementChild.dateTime
      );
};

$datePicker.onfocus = () => {
  $calendar.classList.add('active');
};
