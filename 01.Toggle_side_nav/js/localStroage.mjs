const setNavState = newState => {
  localStorage.setItem('isNavFolded', newState);
};

const getNavState = () => JSON.parse(localStorage.getItem('isNavFolded'));

export { setNavState, getNavState };
