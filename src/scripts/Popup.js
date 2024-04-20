export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector); // toma el popupSelector de la clase hijo y genera el popupElement que lo puede usar la clase hijo
  }
  open() {
    //open popup
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    //close popup
    this._popupElement.classList.remove("modal_opened");
  }
  _handleEscClose(evt) {
    //close with Esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    //set event listeners
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
