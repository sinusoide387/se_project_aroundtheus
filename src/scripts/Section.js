export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    console.log(items);
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
