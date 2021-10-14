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

// Function
const render = () => {
  $calendar.innerHTML = `
  <div class="calendar-nav">
  <h2 class="calendar-title">${months[state.month]}<span>${
    state.year
  }</span></h2>
  <button class="button btnPrev">◀</button>
  <button class="button btnNext">▶</button>
</div>
<div class="calendar-grid">
  <div class="week">
    <div>SUN</div>
    <div>SUN</div>
    <div>SUN</div>
    <div>SUN</div>
    <div>SUN</div>
    <div>SUN</div>
    <div>SUN</div>
  </div>
  <div class="day">
    <button>
      <time>1</time>
    </button><button>
      <time>2</time>
    </button><button>
      <time>3</time>
    </button><button>
      <time>4</time>
    </button><button>
      <time>5</time>
    </button><button>
      <time>6</time>
    </button><button>
      <time>7</time>
    </button><button>
      <time>8</time>
    </button><button>
      <time>9</time>
    </button><button>
      <time>10</time>
    </button><button>
      <time>11</time>
    </button><button>
      <time>12</time>
    </button><button>
      <time>13</time>
    </button><button>
      <time>14</time>
    </button><button>
      <time>15</time>
    </button><button>
      <time>16</time>
    </button><button>
      <time>17</time>
    </button><button>
      <time>18</time>
    </button><button>
      <time>19</time>
    </button><button>
      <time>20</time>
    </button><button>
      <time>21</time>
    </button><button>
      <time>22</time>
    </button><button>
      <time>23</time>
    </button><button>
      <time>24</time>
    </button><button>
      <time>25</time>
    </button><button>
      <time>26</time>
    </button><button>
      <time>27</time>
    </button><button>
      <time>28</time>
    </button><button>
      <time>29</time>
    </button><button>
      <time>30</time>
    </button><button>
      <time>31</time>
    </button><button>
      <time>32</time>
    </button><button>
      <time>33</time>
    </button><button>
      <time>34</time>
    </button><button>
      <time>35</time>
    </button><button>
      <time>36</time>
    </button><button>
      <time>37</time>
    </button><button>
      <time>38</time>
    </button><button>
      <time>39</time>
    </button><button>
      <time>40</time>
    </button><button>
      <time>41</time>
    </button><button>
      <time>42</time>
    </button>
  </div>`;
};

window.addEventListener('DOMContentLoaded', () => {
  render();
  console.log(state);
});
