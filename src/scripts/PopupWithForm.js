import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super({ popupSelector }); //aca paso el valor ("profile__add-form") a la clase padre (Popup.js), usando super.
    this._popupForm = this._popupElement.querySelector(".modal__form"); //tomamos el form dentro del popupElement que se genero en la clase padre (Popup.js).
    this._handleSubmitForm = handleSubmitForm;
  }
  close() {
    this._popupForm.reset();
    super.close(); // super se refiere al padre, osea el method close del padre
  }
}

//index.js (pretendo que estoy en index.js, esto es como yo instantiate una clase en el index.js).

// imp entre parentesis van los valores que paso a los parametros de las clases.
const newCardPopup = new PopupWithForm("profile__add-form", () => {});

newCardPopup.open();

newCardPopup.close(); // al agregar super.close al hijo, se va a reiniciar y tambien cerrar los popups
// aplicando la funcionalidad de cerrado al padre pero y agregandola con super al hijo.
