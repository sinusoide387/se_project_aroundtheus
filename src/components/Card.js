export class Card {
  constructor(
    { name, link, _id, likes },
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
    this._likes = likes;
  }

  getCardId() {
    return this._id;
  }

  isLike() {
    return this._likes.some((like) => {
      like._id === this._id;
    });
  }
  updateLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this.isLike) {
      likeButton.classList.remove("card__like-button_active");
    } else {
      likeButton.classList.add("card__like-button_active");
    }
    // this._cardElement.querySelector(".card__like-count").textContent =
    //   this._likes.length;
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

  _handleDeleteButton() {
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
