// Recipe View (UI) Controller

import {elements} from './base';
import {Fraction} from 'fractional';
// Clears the previous recipe result
export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};
// Formats the numbers with decimals to fractions
const formatCount = count => {
  if (count) {
    // Rounds the counts
    const newCount = Math.round(count * 10000) / 10000;

    const [int, dec] = newCount.toString().split('.').map(cur => parseInt(cur, 10));

    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
};
// The recipe ingredients
const createIng = ingredient => `
<li class="recipe-item">
  <svg class="recipe-icon">
    <use xlink:href="#icon-check"></use>
  </svg>
  <div class="recipe-count">${formatCount(ingredient.count)}</div>
  <div class="recipe-ingredient">
    <span class="recipe-unit">${ingredient.unit}</span>
    ${ingredient.ingredient}
  </div>
</li>
`;
// Renders the recipe and the ingredients
export const renderRecipe = (recipe, isLiked) => {
  const markup = `
  <figure class="recipe-fig">
    <img src="${recipe.img}" alt="${recipe.title}" class="recipe-img">
    <h1 class="recipe-title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe-details">
    <div class="recipe-info">
      <svg class="recipe-info-icon">
        <use xlink:href="#icon-stopwatch"></use>
      </svg>
      <span class="recipe-info-data recipe-info-data-minutes">${recipe.time}</span>
      <span class="recipe-info-text"> minutes</span>
    </div>
    <div class="recipe-info">
      <svg class="recipe-info-icon">
        <use xlink:href="#icon-man"></use>
      </svg>
      <span class="recipe-info-data recipe-info-data-people">${recipe.servings}</span>
      <span class="recipe-info-text"> servings</span>

      <div class="recipe-info-buttons">
        <button class="bttn-tiny bttn-decrease">
          <svg>
            <use xlink:href="#icon-circle-with-minus"></use>
          </svg>
        </button>
        <button class="bttn-tiny bttn-increase">
          <svg>
            <use xlink:href="#icon-circle-with-plus"></use>
          </svg>
        </button>
      </div>
    </div>
    <button class="recipe-love">
      <svg class="header-favorites">
        <use xlink:href="#icon-heart${isLiked ? '' : '-outlined'}"></use>
      </svg>
    </button>
  </div>

  <div class="recipe-ingredients">
    <ul class="recipe-ingredients-list">

    ${recipe.ingredients.map(cur => createIng(cur)).join('')}

    </ul>

    <button class="bttn-small recipe-bttn recipe-bttn-add">
      <svg class="search-icon">
        <use xlink:href="#icon-shopping-cart"></use>
      </svg>
      <span>Add to shopping list</span>
    </button>
  </div>

  <div class="recipe-directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe-directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe-by">${recipe.author}</span>. Please check out directions at their website.
    </p>
    <a href="${recipe.url}" target="_blank" class="bttn-small recipe-bttn">
      <span>Directions</span>
      <svg class="search-icon">
        <use xlink:href="#icon-triangle-right"></use>
      </svg>
    </a>
  </div>
  `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
// Updates the servings and ingredients on UI
export const updateServIng = recipe => {
  // Updates servings
  document.querySelector('.recipe-info-data-people').textContent = recipe.servings;

  // Updates ingredients
  const countEls = Array.from(document.querySelectorAll('.recipe-count'));
  countEls.forEach((cur, i) => {
    cur.textContent = formatCount(recipe.ingredients[i].count);
  });
};