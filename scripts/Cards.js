export class Card {
  constructor(name, link, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    // // console.log(
    // //   `Card Name: ${this._name}, Card Link: ${this._link} selector : ${this._cardSelector}`
    // );
  }
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        //aca agregamos el eventlistener al like button
        this._handleLikeButton(); // esto va a llamar al handler para agregar o quitar la clase.
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeletteButton();
      });
  }
  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeletteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  getview() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); //Asi obtenemos el template y lo clonamos.
    // const cardTemplate = document.querySelector(this._cardSelector);
    // const cardElement = cardTemplate.content
    //   .cloneNode(true)
    //   .querySelector(".card"); //Otra forma de obtener el template y clonar
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._link);
    this._cardElement
      .querySelector(".card__title")
      .setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__title").textContent = this._name;
    console.log(this._cardElement);
    this._setEventListeners();
    //funcion que llama los eventlisteners
    //get card view.
    //set eventListeners.
    return this._cardElement;
  }
}
