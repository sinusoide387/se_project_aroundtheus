export class Card {
  constructor(name, link, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  ///////event listeners///////
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        //eventlistener para modal de la imagen
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });
    this._cardElement
      .querySelector(".card__like-button") //aca agregamos el eventlistener al like button
      .addEventListener("click", () => {
        this._handleLikeButton(); // esto va a llamar al handler para agregar o quitar la clase.
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeletteButton();
      });
  }
  ////////handlers//////////
  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeletteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  ///////function to render the cards///////
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); //Asi obtenemos el template y lo clonamos.

    this._cardElement // Obtenemos la imagen y le asignamos el "src".
      .querySelector(".card__image")
      .setAttribute("src", this._link);
    this._cardElement // Obtenemos la imagen y le asignamos el "src".
      .querySelector(".card__image")
      .setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__title").textContent = this._name; //asi la descripcion de la card.

    this._setEventListeners(); //funcion que llama los eventlisteners

    return this._cardElement; // y al ultimo devolvemos la card completa asi va donde exportamos esta clase.
  }
}
