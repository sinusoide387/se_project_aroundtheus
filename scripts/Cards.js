export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    // // console.log(
    // //   `Card Name: ${this._name}, Card Link: ${this._link} selector : ${this._cardSelector}`
    // );
  }
  _setEventListeners() {}
  getview() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true); //Asi obtenemos el template y lo clonamos
    // const cardTemplate = document.querySelector(this._cardSelector);
    // const cardElement = cardTemplate.content
    //   .cloneNode(true)
    //   .querySelector(".card"); //Otra forma de obtener el template y clonar
    console.log(this._cardElement);
    this._setEventListeners(); //funcion que llama los eventlisteners
    //get card view.
    //set eventListeners.
    // return the card.
  }
}
