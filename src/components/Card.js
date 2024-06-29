export class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDelete,
    handleLikeToggle
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._handleLikeToggle = handleLikeToggle;
    this._id = _id;
    this._isLiked = isLiked;
  }

  getCardId() {
    return this._id;
  }

  getLikedState() {
    return this._isLiked;
  }
  updateLikes(newLikes) {
    this._isLiked = newLikes;
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
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
        this._handleLikeToggle(this); // esto va a llamar al handler para agregar o quitar la clase.
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelete();
      });
  }
  ////////handlers//////////
  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _openDeletePopup() {
    deletePopup.open();
  }

  deleteCard() {
    // _handleDeleteButton
    //funcion que hace el borrado
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
    this._renderLikes();
    return this._cardElement; // y al ultimo devolvemos la card completa asi va donde exportamos esta clase.
  }
}
