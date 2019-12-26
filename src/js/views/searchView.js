// Search View (UI) Controller

// Imports DOM strings from base.js
import {elements} from './base';
// Reads the input
export const getInput = () => elements.searchInput.value;
// Clears the input field after a search has been made
export const clearInput = () => {
  elements.searchInput.value = '';
};
// Clears the old results when making a new search
export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};
// Highlights the selected recipe on search results
export const highlightSelected = id => {
  const resArr = Array.from(document.querySelectorAll('.results-link'));
  resArr.forEach(cur => {
    cur.classList.remove('results-link-active');
  });
  document.querySelector(`.results-link[href="#${id}"]`).classList.add('results-link-active');
};

// Limits the number of characters of recipes
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    // Returns the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// Gets recipe information and shows it on the results panel on UI
const renderRecipe = recipe => {
  const markup = `
  <li>
    <a href="#${recipe.recipe_id}" class="results-link">
      <figure class="results-fig">
        <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results-data">
        <h4 class="results-name">${limitRecipeTitle(recipe.title)}</h4>
        <p class="results-author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
  `;
  // Adds the new result after the old result(s)
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
// Creates the prev and next page buttons
const createButtons = (page, type) => `
<button class="bttn-inline results-bttn-${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  <svg class="search-icon">
    <use xlink:href="#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
  </svg>
</button>
`;

// Prev page and next page buttons
const renderButtons = (page, numOfRes, resPerPage) => {
  const pages = Math.ceil(numOfRes / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Shows only the next page button
    button = createButtons(page, 'next');
  } else if (page < pages) {
    // Shows both of the buttons
    button = `
    ${createButtons(page, 'prev')}
    ${createButtons(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Shows only the prev page button
    button = createButtons(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// Loops through the results and gets them
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // Renders the results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  // Renders pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};