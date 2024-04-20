export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector); // toma el popupSelector de la clase hijo y genera el popupElement que lo puede usar la clase hijo
  }
  open() {
    //open popup
  }
  close() {
    //close popup
  }
  _handleEscClose() {
    //close with Esc button
  }
  setEventListeners() {
    //set event listeners
  }
}
