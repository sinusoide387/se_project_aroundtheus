import { Api } from "../components/Api.js";
import { FormValidation } from "../components/FormValidation.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import { UserInfo } from "../components/UserInfo.js";

const cardData1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
const cardData2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};
const cardData3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};
const cardData4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};
const cardData5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};
const cardData6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  cardData1,
  cardData2,
  cardData3,
  cardData4,
  cardData5,
  cardData6,
];

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
    console.log(cards);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("I got an error:", err.message));

apiInstance
  .getUserInfo() // metodo de api para obtener el user
  .then((userInfo) => {
    console.log(userInfo);
    newUserInfo.setUserInfo(userInfo.name, userInfo.about);
  })
  .catch((err) => console.error("I got an error:", err.message));

apiInstance // llamo al metodo de la api class para actualizar el usuario
  .editProfile()
  .then((userUpdate) => {
    console.log(userUpdate);
  })
  .catch((err) => console.log.error("I got an error:", err.message));

apiInstance
  .addNewCard()
  .then((newCard) => {
    console.log(newCard);
  })
  .catch((err) => {
    console.log("I got an error:", err.message);
  });

/// card class factory////////
function getCardView(cardData) {
  // cree una nueva funcion para asi poder sacar la clase con el objeto y usarla donde quiero generar cards, como el summit eventlistener.
  const card = new Card(
    cardData.name || cardData.Name,
    cardData.link || cardData.Link,

    "#card-template",
    handleImageClick
  );

  return card.getView(); // aca le doy a la funcion con todos los datos, template y handler para que los use en otra funcion
}

///submit functions  (add and edit)  ///

function handleAddFormSubmit(inputValues) {
  const { name, link } = inputValues; // toma el name y link de los inputs

  const cardData = {
    // genero una constante que va a pasar como parametro de la clase abajo
    name: name,
    link: link,
  };

  const cardElement = getCardView(cardData); // hago otra constante para agarrar la clase con el parametro o los valores
  cardSection.addItem(cardElement); // la cardList es un /ul en index.htm separa en una <section>

  addPlacePopup.close(); // llamo al cerrado con la constante de la clase que genere la close()
}

function handleEditSubmit(inputValues) {
  // una forma de resumir multiples parametros en uno solo
  const { title, description } = inputValues; // topa los valores del "name" property en los inputs

  newUserInfo.setUserInfo(title, description); // llamo el metodo usando el nombre de la constante que use para intantiate la clase

  editProfilePopup.close(); // llamo al close() usando la constante con la cual invoque la clase, imp: lo puedo hacer en cualquier lugar que requiera la funcion
}

const editFormValidation = new FormValidation(settings, profileEditForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidation(settings, profileAddForm);
addFormValidation.enableValidation();

//// Section class/////

const cardSection = new Section(
  { items: initialCards, renderer: getCardView },
  ".cards__list"
);

//// Popups in general /////

const addPlaceButton = document.querySelector("#profile__add-button");
addPlaceButton.addEventListener("click", () => {
  addPlacePopup.open(); //llamo el metodo open () cuando hago click en el boton. busco el boton y agrego eventlistener
});

//// PopupWithForm class /////

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#profile__edit-modal" },
  handleEditSubmit
);

editProfilePopup.setEventListeners();

/// UserInfo class ///

const newUserInfo = new UserInfo({
  // llamo a la clase para usar los metodos
  nameSelector: "#profile__title", // los selectores que use, nose porque no llevan -input al final.
  jobSelector: "#profile__description",
});

const editProfileButton = document.querySelector("#profile__edit-button");
editProfileButton.addEventListener("click", () => {
  const currentUser = newUserInfo.getUserInfo(); //usar la funcion que obtiene la info  y ponerla en una constante

  profileTitleInput.value = currentUser.name.trim(); // usar el selector de los inputs, y ponerle la constante mas el parametro que se uso en la funcion de la clase
  profileDescriptionInput.value = currentUser.job.trim();

  editProfilePopup.open();
});

const addPlacePopup = new PopupWithForm(
  { popupSelector: "#profile__add-form" },
  handleAddFormSubmit
);

addPlacePopup.setEventListeners();

//// PopupWithImage class ////

const popupImage = new PopupWithImage("#preview__image_modal"); //llamo a la clase (insatntiate)

function handleImageClick(cardData) {
  // genero una funcion para poder usar un metodo de la clase en otros lugares (ejemplo:cuando creo nueva carta})
  popupImage.open(cardData);
}

popupImage.setEventListeners(); //activo los eventListeners de la clase usando la constante
