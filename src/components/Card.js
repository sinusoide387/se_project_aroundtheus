// import { Api } from "./Api";
import { PopupDelete } from "./PopupDelete";
export class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDelete
    // handleLikeToggle
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;

    this._id = _id;
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

    // this._cardElement
    //   .querySelector(".card__delete-button") // selecciono el icono del basurero
    //   .addEventListener("click", () => {
    //     this._handleDelete(this._id) // se tiene que eliminar primero la card del API usando el _id
    //       .then(() => {
    //         this._handleDeleteButton(); // y despues se usa la funcion para eliminar la card del DOM si la respuesta anterior fue positiva
    //       })
    //       .catch((err) => {
    //         console.error(`failed to delete the card with: ${this._id}`, err);
    //       });
    // le agrego el eventlistener click
    // const deletePopup = document.querySelector("#delete__card-modal"); // selecciono el modal (are you sure?)
    // deletePopup.classList.add("modal_opened"); // le agrego la clase que tiene el display:visible
    // this._setDeleteEventListener(); // llamo a la funcion que se encarga de borrar la card (mas abajo esta hecha)
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
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
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

  getCardId() {
    return this._id;
  }
}
