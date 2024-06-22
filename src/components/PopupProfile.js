import Popup from "./Popup";

export class PopupProfile extends Popup {
  constructor({ popupSelector }, handleSubmitPicture) {
    super({ popupSelector });
    this._popupPicture = document.querySelector("#profile__picture-modal");
    this._saveButton = document.querySelector("#update__picture-button");
    this._handleSubmitPicture = handleSubmitPicture;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._saveButton) {
      this._saveButton.addEventListener("click", (event) => {
        event.preventDefault;
        console.log("click");
        this._handleSubmitPicture();
        super.close();
      });
    } else {
      console.error("Error update new Profile picture");
    }
  }
}
