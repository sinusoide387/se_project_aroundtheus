// import { Api } from "./Api";
import { PopupDelete } from "./PopupDelete";
export class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDelete
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
        this._openDeletePopup();
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
  // _setDeleteEventListener() {
  //   // este metodo le pone el eventlistener al boton :"yes".
  //   const deleteModal = document.querySelector("#delete__card-modal"); // hago una const para el modal
  //   const deleteButton = deleteModal.querySelector("#delete__card-button"); // hago otra para el boton dentro del modal

  //   deleteButton.addEventListener("click", () => {
  //     // al boton ("yes") le agrego el event listener
  //     this._handleDeleteButton(); // cuando hace click llama a la funcion para que borre la card
  //     deleteModal.classList.remove("modal_opened"); // y remueve el modal tambien
  //   });
  // }
  _openDeletePopup() {
    const deletePopup = new PopupDelete(
      { popupSelector: "#delete__card-modal" },
      () =>
        this._handleDelete(this._id)
          .then(() => {
            this._handleDeleteButton();
            deletePopup.close();
          })
          .catch((err) => {
            console.error(
              `Failed to delete the card with id: ${this._id}`,
              err
            );
          })
    );
    deletePopup.setEventListeners();
    deletePopup.open();
  }

  _handleDeleteButton() {
    // esta es la funcion basica que remueve la carta
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
