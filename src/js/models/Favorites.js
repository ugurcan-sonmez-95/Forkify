// Favorites Model

// Favorites function constructor
export default class Favorites {
  constructor() {
    this.favorites = [];
  }
  // Adds the liked item(s) to the favorites
  addFavorite(id, title, author, img) {
    const favorite = {
      id,
      title,
      author,
      img
    };
    this.favorites.push(favorite);

    // Persists the data in localStorage
    this.persistData();

    return favorite;
  }
  // Deletes the liked item(s) from the favorites
  deleteFavorite(id) {
    const index = this.favorites.findIndex(cur => cur.id === id);
    this.favorites.splice(index, 1);

    // Persists the data in localStorage
    this.persistData();
  }
  // Checks if an item is liked or not
  isLiked(id) {
    return this.favorites.findIndex(cur => cur.id === id) !== -1;
  }
  // Gets the total number of favorites
  getNumFavorites() {
    return this.favorites.length;
  }
  // Persists the data in localStorage
  persistData() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  // Reads the storage
  readStorage() {
    const storage = JSON.parse(localStorage.getItem('favorites'));
    // Restores favorites from the localStorage
    if (storage) this.favorites = storage;
  }
};