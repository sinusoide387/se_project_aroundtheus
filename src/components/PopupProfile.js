import Popup from "./Popup";

export class PopupProfile extends Popup {
  constructor({ popupSelector }, handleSubmitPicture) {
    super({ popupSelector });
    this._popupPicture = document.querySelector("#profile__picture-modal");
    this._saveButton = this._popupPicture.querySelector(
      "#update__picture-button"
    );
    this._handleSubmitPicture = handleSubmitPicture;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._saveButton) {
      this._saveButton.addEventListener("click", (event) => {
        event.preventDefault;
        this._handleSubmitPicture;
      });
    } else {
      console.error("Error update new Profile picture");
    }
  }
}
