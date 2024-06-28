import { Api } from "../components/Api.js";
import { FormValidation } from "../components/FormValidation.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { UserInfo } from "../components/UserInfo.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { PopupProfile } from "../components/PopupProfile.js";

const profileEditButton = document.querySelector("#profile__edit-button");

const profileEditModal = document.querySelector("#profile__edit-modal");

const pofileCloseButton = document.querySelector("#profile__close-modal");

const profileTitle = document.querySelector("#profile__title");

const profileTitleInput = document.querySelector("#profile__title-input");

const profileDescription = document.querySelector("#profile__description");

const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardList = document.querySelector(".cards__list");
//////////////////////Add_card_profile_elements/////////////////////////////////////////////////

const addNewCardButton = document.querySelector("#profile__add-button");

const profileAddModal = document.querySelector("#profile__add-form");

const profileAddForm = document.querySelector("#add-card-form");

const profilePictureForm = document.querySelector("#profile__picture__form");

const profilePlaceInput = document.querySelector(".modal__input_type_title");

const profilePlaceInputUrl = document.querySelector(".modal__input-type_url");

const profileCloseButtonPlace = document.querySelector(
  "#profile__close-modal-place"
);

const preViewImageModal = document.querySelector("#preview__image_modal");

const modalImageCloseButton = preViewImageModal.querySelector(
  "#modal__image-close-button"
);

const modalImageSrc = preViewImageModal.querySelector("#modal__image");

const modalImageDescription = preViewImageModal.querySelector(
  "#modal__image_description"
);

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/// API classes ///

const apiInstance = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: "ca29b9d7-c085-4996-bfd4-aa6f252bbde8",
  contentType: "application/json",
});

apiInstance
  .getInitialCards() // metodo de api class para obtener las cards
  .then((cards) => {
    // puse cards, pero tambien se usa "res"de respuesta
    console.log(cards);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("I got an error:", err.message));

apiInstance // llamo al metodo de la api class para actualizar el usuario
  .getUserInfo()
  .then((userUpdate) => {
    console.log(userUpdate);
    newUserInfo.setUserInfo(userUpdate.name, userUpdate.about);
  })
  .catch((err) => console.log.error("I got an error:", err.message));

function handleDelete(card) {
  // funcion que integra el popup con el api request class, y la uso en la card class
  deletePopup.open(); // abre el popup
  deletePopup.setSubmitAction(() => {
    // llamo a la funcion, esta funcion actua como conexion entre popup, el request y la card en si
    const cardId = card.getCardId();
    apiInstance
      .deleteCard(cardId) // primero lo borro con el request
      .then(() => {
        card._handleDeleteButton(); //luego la respuesta hace que active la funcion para borrarla fisicamente
        deletePopup.close(); // cierra el popup luego de borrar la card
      })
      .catch((err) => {
        console.error(`Failed to delete card with ID ${cardId}:`, err.message);
      });
  });
}

function handleLikes(card) {
  const cardId = card.getCardId(); //card._id
  const isLiked = card.getLikedState(); //card._isLiked

  if (isLiked) {
    apiInstance
      .removeLike(cardId)
      .then((updatedCard) => {
        card.updateLikes(updatedCard.isLiked);
      })
      .catch((err) => {
        console.error(
          `Failed to remove like from card with ID ${cardId}:`,
          err.message
        );
      });
  } else {
    apiInstance
      .addLikes(cardId)
      .then((updatedCard) => {
        card.updateLikes(updatedCard.isLiked);
      })
      .catch((err) => {
        console.error(
          `Failed to add like to card with ID ${cardId}:`,
          err.message
        );
      });
  }
}

/// card class factory////////
function getCardView(cardData) {
  // cree una nueva funcion para asi poder sacar la clase con el objeto y usarla donde quiero generar cards, como el summit eventlistener.
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    () => handleDelete(card),
    handleLikes
  );

  return card.getView(); // aca le doy a la funcion con todos los datos, template y handler para que los use en otra funcion
}

const deletePopup = new PopupDelete(
  { popupSelector: "#delete__card-modal" },
  (cardId) => {
    // esto actua toma el lugar del "handleDelete" de la PopupDelete class
    apiInstance.deleteCard(cardId).then(() => {
      //aca usa el request del servidor para borrar la carta pasando el _id
      console.log("message");
    });
  }
);

deletePopup.setEventListeners(); //siempre llamar los eventListeners para todas las clases

////////////////////////////////validation classes////////////////////////////////////////////////

const editFormValidation = new FormValidation(settings, profileEditForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidation(settings, profileAddForm);
addFormValidation.enableValidation();

//// Section class/////

const cardSection = new Section({ renderer: getCardView }, ".cards__list");

/// UserInfo class ///

const newUserInfo = new UserInfo({
  // llamo a la clase para usar los metodos
  nameSelector: "#profile__title", // los selectores que use, nose porque no llevan -input al final.
  jobSelector: "#profile__description",
});

///  profile picture popup ///

const popupProfile = new PopupWithForm( // uso la clase PopupWithForm con los eventlisteners y la coneccion que tiene con la Popup class
  { popupSelector: "#profile__picture-modal" }, // pero le asigno como nuevo selector el nuevo popup que acepta links
  handleSubmitPicture // y la nueva funcion para que llame la API class y agrege el valor del input cuando haga submit
);

popupProfile.setEventListeners(); // los eventListeners son ahora los de PopupWithForm

//// PopupWithForm class /////

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#profile__edit-modal" },
  handleEditSubmit
);

editProfilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm(
  { popupSelector: "#profile__add-form" },
  handleAddFormSubmit
);

addPlacePopup.setEventListeners();

//// PopupWithImage class ////

const popupImage = new PopupWithImage("#preview__image_modal"); //llamo a la clase (insatntiate)

///submit functions  (add, edit, profilepicture )  ///

function handleAddFormSubmit(inputValues) {
  const { name, link } = inputValues; // Extract name and link from input values
  addPlacePopup.setButtonText("Saving..");
  apiInstance
    .addNewCard(name, link) // toma el name y el link
    .then((newCard) => {
      // newCard es la respuesta y contiene el name y link
      console.log(newCard);

      const cardElement = getCardView(newCard); // usamos esa respuesta y la ponemos en una constante junto con la funcion que genera la carta
      cardSection.addItem(cardElement); // mandamos la carta recien creada con la info de API al browser o UI

      addPlacePopup.close(); // cerramos el popup
    })
    .catch((err) => {
      console.log("I got an error:", err.message);
    })
    .finally(() => {
      addPlacePopup.setButtonText("Save");
    });
}

function handleEditSubmit(inputValues) {
  // una forma de resumir multiples parametros en uno solo
  const { title, description } = inputValues; // toma los valores del "name" property en los inputs
  editProfilePopup.setButtonText("Saving..");
  // llamo el metodo usando el nombre de la constante que use para intantiate la clase
  apiInstance
    .editProfile(title, description) // metodo de api para obtener el user
    .then((userInfo) => {
      console.log(userInfo);
      newUserInfo.setUserInfo(title, description);
      editProfilePopup.close();
    })
    .catch((err) => console.error("I got an error:", err.message))
    .finally(() => {
      editProfilePopup.setButtonText("Save");
    });

  // llamo al close() usando la constante con la cual invoque la clase, imp: lo puedo hacer en cualquier lugar que requiera la funcion
}

function handleSubmitPicture() {
  const input = document.querySelector("#profile__picture-input");
  // inputValues = input.value;
  const profilePicture = document.querySelector(".profile__image");
  const newAvatarUrl = input.value.trim();
  popupProfile.setButtonText("Saving..");
  apiInstance
    .updateProfile(newAvatarUrl)
    .then((newAvatarUrl) => {
      console.log(newAvatarUrl);
      profilePicture.src = newAvatarUrl.avatar;
      popupProfile.close();
    })
    .catch((err) => {
      console.error("I got an error:", err.message);
    })
    .finally(() => {
      popupProfile.setButtonText("Save");
    });

}

//// Popups in general /////

const addPlaceButton = document.querySelector("#profile__add-button");
addPlaceButton.addEventListener("click", () => {
  addPlacePopup.open(); //llamo el metodo open () cuando hago click en el boton. busco el boton y agrego eventlistener
});

const editProfileButton = document.querySelector("#profile__edit-button");
editProfileButton.addEventListener("click", () => {
  const currentUser = newUserInfo.getUserInfo(); //usar la funcion que obtiene la info  y ponerla en una constante

  profileTitleInput.value = currentUser.name.trim(); // usar el selector de los inputs, y ponerle la constante mas el parametro que se uso en la funcion de la clase
  profileDescriptionInput.value = currentUser.job.trim();

  editProfilePopup.open();
});

function handleImageClick(cardData) {
  // genero una funcion para poder usar un metodo de la clase en otros lugares (ejemplo:cuando creo nueva carta})
  popupImage.open(cardData);
}

popupImage.setEventListeners(); //activo los eventListeners de la clase usando la constante

/// handle submit function for popupProfile ///

const popupPictureButton = document.querySelector(".profile__image-button");

popupPictureButton.addEventListener("click", () => {
  popupProfile.open();
});
