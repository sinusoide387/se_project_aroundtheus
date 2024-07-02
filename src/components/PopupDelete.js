import Popup from "./Popup";

export class PopupDelete extends Popup {
  constructor({ popupSelector }, handleDelete) {
    super({ popupSelector });
    this._popupDelete = document.querySelector("#delete__card-modal");
    this._deleteButton = document.querySelector("#delete__card-button");
    this._handleSubmit = handleDelete;
  }
  setButtonText(text) {
    // esta funcion cambia el texto del botton para submmit, puedo poner el texto que quiera como parametro
    this._deleteButton.textContent = text;
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", (event) => {
        event.preventDefault;
        this._handleSubmit();
      });
    } else {
      console.error("Delete button not found.");
    }
  }
}
