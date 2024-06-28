import Popup from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector }); //aca paso el valor ("profile__add-form") a la clase padre (Popup.js), usando super.
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._formInputs = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button"); // recordar que cada vez que agrego un elemento, tengo que definirlo en el constructor de la clase
    this._originalButtonText = this._submitButton.textContent; // guardo aca el texto original
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // hacer un objeto para los inputs
    const inputObject = {};

    // nombra cada input con su valor
    this._formInputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });

    // y devuelve el input con el valor del nombre
    return inputObject;
  }

  // _getInputValue should be called to get the object.
  setButtonText(text) {
    // esta funcion cambia el texto del botton para submmit, puedo poner el texto que quiera como parametro
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close(); // super se refiere al padre, osea el method close del padre
    this._submitButton.textContent = this._originalButtonText; // lo vuelve al texto original cuando cierra el popUp
  }
}
