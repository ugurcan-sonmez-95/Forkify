// Favorites View (UI) Controller

import {elements} from './base';
import {limitRecipeTitle} from './searchView';

// Toggles like button if an item is liked or not
export const toggleLikeBttn = isLiked => {
  const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe-love use').setAttribute('href', `#${iconStr}`);
};

// Toggles favorites menu if there is a liked item or not
export const toggleFavMenu = numFavs => {
  elements.favsField.style.visibility = numFavs > 0 ? 'visible' : 'hidden';
};
// Renders likes on UI list
export const renderFavs = fav => {
  const markup = `
  <li>
    <a href="#${fav.id}" class="favorites-link">
      <figure class="favorites-fig">
        <img src="${fav.img}" alt="${fav.title}">
      </figure>
      <div class="favorites-data">
        <h4 class="favorites-name">${limitRecipeTitle(fav.title)}</h4>
        <p class="favorites-author">${fav.author}</p>
      </div>
    </a>
  </li>
  `;
  elements.favsList.insertAdjacentHTML('beforeend', markup);
};
// Deletes likes on UI list
export const deleteFavs = id => {
  const el = document.querySelector(`.favorites-link[href="#${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
};