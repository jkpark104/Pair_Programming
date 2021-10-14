// Months array
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
// Days of the Week
const daysOfWeek = ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'];
const gridsize = 42; // Total number of date boxes in the grid

// Default the state to current month and year.
const state = {
  month: new Date().getMonth(),
  year: new Date().getFullYear()
};

// The following function builds an array of objects with dates to be displayed in the grid
function datesForGrid(year, month) {
  // days array holds all the days to be populated in the grid
  const dates = [];
  // Day on which the month starts
  const firstDay = new Date(year, month).getDay();
  // Total number of days in the month
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  // Total number of days in the previous month
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  // Days from prev month to show in the grid
  for (var i = 1; i <= firstDay; i++) {
    const prevMonthDate = totalDaysInPrevMonth - firstDay + i;
    var key = new Date(
      state.year,
      state.month - 1,
      prevMonthDate
    ).toLocaleString();
    dates.push({
      key,
      date: prevMonthDate,
      monthClass: 'prev'
    });
  }
  // Days of the current month to show in the grid
  const today = new Date();
  for (var i = 1; i <= totalDaysInMonth; i++) {
    var key = new Date(state.year, state.month, i).toLocaleString();
    if (
      i === today.getDate() &&
      state.month === today.getMonth() &&
      state.year === today.getFullYear()
    ) {
      dates.push({
        key,
        date: i,
        monthClass: 'current',
        todayClass: 'today'
      });
    } else {
      dates.push({
        key,
        date: i,
        monthClass: 'current'
      });
    }
  }

  // If there is space left over in the grid, then show the dates for the next month
  if (dates.length < gridsize) {
    const count = gridsize - dates.length;
    for (var i = 1; i <= count; i++) {
      var key = new Date(state.year, state.month + 1, i).toLocaleString();
      dates.push({
        key,
        date: i,
        monthClass: 'next'
      });
    }
  }
  return dates;
}

function render() {
  const calendarApp = document.querySelector('[data-app=calendar-app]');
  // Building the calendar app HTML from the data
  calendarApp.innerHTML = `
      <div class="calendar-nav">
        <button id="prev-month">Previous</button>
        <h2>${months[state.month]} ${state.year}</h2>
        <button id="next-month">Next</button>
      </div>
      <div class='calendar-grid'>
        ${daysOfWeek.map(day => `<div>${day}</div>`).join('')}
        ${datesForGrid(state.year, state.month)
          .map(
            date =>
              `<div id="${date.key}" class="${date.monthClass} ${
                date.todayClass ? date.todayClass : ''
              }">${date.date}</div>`
          )
          .join('')}
      </div>
  `;
}

function showCalendar(prevNextIndicator) {
  const date = new Date(state.year, state.month + prevNextIndicator);
  // Update the state
  state.year = date.getFullYear();
  state.month = date.getMonth();
  render();
}

// Show the current month by default
showCalendar(0);

document.addEventListener('click', ev => {
  if (ev.target.id === 'prev-month') {
    showCalendar(-1);
  }
  if (ev.target.id === 'next-month') {
    showCalendar(1);
  }
});
