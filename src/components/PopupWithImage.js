import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    this._description = this._popupElement.querySelector(
      ".modal__image_description"
    );
    this._image = this._popupElement.querySelector(".modal__image");

    this._description.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }
}
