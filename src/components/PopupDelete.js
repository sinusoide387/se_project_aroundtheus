import Popup from "./Popup";

export class PopupDelete extends Popup {
  constructor({ popupSelector }, handleDelete) {
    super({ popupSelector });
    this._popupDelete = document.querySelector("#delete__card-modal");
    this._deleteButton = document.querySelector("#delete__card-button");
    this._handleSubmit = this._handleSubmit;
    // this.handleDelete = handleDelete;
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
        // this.handleDelete();
      });
    } else {
      console.error("Delete button not found.");
    }
  }
}
