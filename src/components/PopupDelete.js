import Popup from "./Popup";

export class PopupDelete extends Popup {
  constructor({ popupSelector }, handleDelete) {
    super({ popupSelector });
    this._popupDelete = document.querySelector("#delete__card-modal");
    this._deleteButton = document.querySelector("#delete__card-button");
    this.handleDelete = handleDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this.handleDelete();
      });
    } else {
      console.error("Delete button not found.");
    }
  }
}
