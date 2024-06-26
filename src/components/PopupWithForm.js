import Popup from "./Popup";

export class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector }); //aca paso el valor ("profile__add-form") a la clase padre (Popup.js), usando super.
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._formInputs = this._popupElement.querySelectorAll(".modal__input");

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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close(); // super se refiere al padre, osea el method close del padre
  }
}

//index.js (pretendo que estoy en index.js, esto es como yo instantiate una clase en el index.js).

// imp entre parentesis van los valores que paso a los parametros de las clases.
// al agregar super.close al hijo, se va a reiniciar y tambien cerrar los popups
// aplicando la funcionalidad de cerrado al padre pero  agregandola con super al hijo.
