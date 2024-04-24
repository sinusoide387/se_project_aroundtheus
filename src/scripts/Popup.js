export default class Popup {
  constructor(popupSelector) {
    this._popupElement = this._popupElement.querySelector(popupSelector); // toma el popupSelector de la clase hijo y genera el popupElement que lo puede usar la clase hijo

    this._closeButton = document.querySelector(".modal__close");
  }
  _handleEscClose(evt) {
    //close with Esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }
  open() {
    //open popup
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    //close popup and remove handleEscClose
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    //set event listeners
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
