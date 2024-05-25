export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector); // toma el popupSelector de la clase hijo y genera el popupElement que lo puede usar la clase hijo

    this._closeButton = this._popupElement.querySelector(".modal__close");
 
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    //close popup and remove handleEscClose
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
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
