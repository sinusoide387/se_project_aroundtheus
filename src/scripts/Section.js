export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  addItem(item) {
    this._containerSelector.append(item);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}
