// Shopping List View (UI) Controller

import {elements} from './base';
// Renders the item on UI
export const renderItem = item => {
  const markup = `
  <li class="shopping-item" data-itemid=${item.id}>
    <div class="shopping-count">
      <input type="number" min="1" value="${item.count}" step="${item.count}" class="shopping-count-value">
      <p>${item.unit}</p>
    </div>
      <p class="shopping-description">${item.ingredient}</p>
    <button class="shopping-delete bttn-tiny">
      <svg>
        <use xlink:href="#icon-circle-with-cross"></use>
      </svg>
    </button>
  </li>
  `;
  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

// Clears the shopping list
export const clearShoppingList = () => {
  elements.shoppingList.innerHTML = '';
};

// Deletes the item on UI
export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};