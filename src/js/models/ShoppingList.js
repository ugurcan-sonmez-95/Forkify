// Shopping List Model

// This is an external library that creates random unique IDs for items
import uniqid from 'uniqid';

// ShoppingList function constructor
export default class ShoppingList {
  constructor() {
    this.items = [];
  }
  // Adds items to the 'items' array
  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }
  // Deletes items from the 'items' array
  deleteItem(id) {
    const index = this.items.findIndex(cur => cur.id === id);
    this.items.splice(index, 1);
  }
  // Updates the count of items in the 'items' array
  updateCount(id, newCount) {
    this.items.find(cur => cur.id === id).count = newCount;
  }
};