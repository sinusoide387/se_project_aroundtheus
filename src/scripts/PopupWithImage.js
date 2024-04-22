import Popup from "./Popup";
export class PopupWithImage extends Popup {
  open({ name, link }) {
    //sobrescribimos el metodo open del parent y le agregamos atributos
    const popupImage = document.querySelector("#modal__image");
    popupImage.src = link;
    popupImage.alt = name;

    const imageDescription = document.querySelector(
      "#modal__image_description"
    );
    imageDescription.textContent = name;

    super.open();
  }
}
