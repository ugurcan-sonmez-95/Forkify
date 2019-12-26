// Global App Controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import Favorites from './models/Favorites';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as favoritesView from './views/favoritesView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
* Search object
* Current recipe object
* Shopping list object
* Liked recipes
*/

const state = {};

// SEARCH CONTROLLER //
const controlSearch = async () => {
  // Gets query from view
  const query = searchView.getInput();

  if (query) {
    // New search object and adds it to the state
    state.search = new Search(query);

    // Prepares UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // Searches for recipes
      await state.search.getResults();

      // Renders results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert(`Cannot process the search.`);
      clearLoader();
    }
  }
};
// Checks if the user submitted an input
elements.searchButton.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});
// Applies the page button logic when clicked
elements.searchResPages.addEventListener('click', event => {
  const bttn = event.target.closest('.bttn-inline');

  if (bttn) {
    const goToPage = parseInt(bttn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER //
const controlRecipe = async () => {
  // Gets the ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepares UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlights the selected search result
    if (state.search) searchView.highlightSelected(id);

    // Creates new recipe object
    state.recipe = new Recipe(id);

    try {
      // Gets recipe data and parses ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIng();

      // Calculates the time and servings
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Renders the recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.favorites.isLiked(id));
    } catch (error) {
      console.log(error);
      alert(`Cannot process the recipe.`);
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// SHOPPING LIST CONTROLLER //
const controlShoppingList = () => {
  // Creates a new shopping list if there is none
  if (!state.list) state.list = new ShoppingList();
  // Adds ingredients to the shopping list and UI
  state.recipe.ingredients.forEach(cur => {
    const item = state.list.addItem(cur.count, cur.unit, cur.ingredient);
    shoppingListView.renderItem(item);
  });
};

// Handles delete and update list item events
elements.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('.shopping-item').dataset.itemid;
  // Handles the delete button
  if (event.target.matches('.shopping-delete, .shopping-delete *')) {
    // Deletes from state
    state.list.deleteItem(id);

    // Deletes from UI
    shoppingListView.deleteItem(id);
    // Handles the count updating
  } else if (event.target.matches('.shopping-count-value')) {
    const val = parseFloat(event.target.value, 10);
    if (val > 0) state.list.updateCount(id, val);
  }
});

// FAVORITES CONTROLLER //
const controlFavorites = () => {
  if (!state.favorites) state.favorites = new Favorites();
  const curID = state.recipe.id;

  // There is no liked recipe
  if (!state.favorites.isLiked(curID)) {
    // Adds like to the state
    const addLike = state.favorites.addFavorite(
      curID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggles the like button
    favoritesView.toggleLikeBttn(true);

    // Adds the like to UI list
    favoritesView.renderFavs(addLike);

    // There is liked recipe
  } else {
    // Removes like from the state
    state.favorites.deleteFavorite(curID);

    // Toggles the like button
    favoritesView.toggleLikeBttn(false);

    // Removes the like from UI list
    favoritesView.deleteFavs(curID);
  }
  // Toggles favorites menu if there is a liked item or not
  favoritesView.toggleFavMenu(state.favorites.getNumFavorites());
};

// Restores liked recipes when the page is loaded
window.addEventListener('load', () => {
  state.favorites = new Favorites();
  // Restores the liked items
  state.favorites.readStorage();
  // Toggles the favorites menu button
  favoritesView.toggleFavMenu(state.favorites.getNumFavorites());
  // Renders the liked items on UI when page is loaded
  state.favorites.favorites.forEach(fav => favoritesView.renderFavs(fav));
});

// Handles the recipe button clicks
elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.bttn-decrease, .bttn-decrease *')) {
    // Runs when the decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServIng(state.recipe);
    }
  } else if (event.target.matches('.bttn-increase, .bttn-increase *')) {
    // Runs when the increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServIng(state.recipe);
  } else if (event.target.matches('.recipe-bttn-add, .recipe-bttn-add *')) {
    shoppingListView.clearShoppingList();
    // Adds items to the shopping list
    controlShoppingList();
  } else if (event.target.matches('.recipe-love, .recipe-love *')) {
    // Controls favorites
    controlFavorites();
  }
});