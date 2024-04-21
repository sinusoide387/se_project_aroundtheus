import Popup from "./Popup";
export class PopupWithImage extends Popup {
  open({ name, link }) {
    //sobrescribimos el metodo open del parent y le agregamos atributos
    this._popupElement.querySelector("#preview__image_modal").textContent =
      name;
    image.src = link;
    image.alt = name;
    super.open();
  }
}
