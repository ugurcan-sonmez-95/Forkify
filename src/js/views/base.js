// DOM strings

export const elements = {
  searchButton: document.querySelector('.search'),
  searchInput: document.querySelector('.search-field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results-list'),
  searchResPages: document.querySelector('.results-pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping-list'),
  favsField: document.querySelector('.favorites-field'),
  favsList: document.querySelector('.favorites-list')
};

export const elementStrings = {
  loader: 'loader'
};
// Adds the loader animation for searching process
export const renderLoader = parent => {
  const loader = `
  <div class="${elementStrings.loader}">
    <svg>
      <use xlink:href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};
// Clears the loader animation after the search is finished
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};