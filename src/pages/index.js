import { FormValidation } from "../components/FormValidation.js";
import { Card } from "../components/Card.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import "../pages/index.css";
import { UserInfo } from "./UserInfo.js";

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

///////////////////////////////////////Profile_edit_elements/////////////////////////////////////////////////////////////

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
//////////////////////////////// modal-image elements ///////////////////////////////////////////
const preViewImageModal = document.querySelector("#preview__image_modal");

const modalImageCloseButton = preViewImageModal.querySelector(
  "#modal__image-close-button"
);

const modalImageSrc = preViewImageModal.querySelector("#modal__image");

const modalImageDescription = preViewImageModal.querySelector(
  "#modal__image_description"
);

//////////////////////////////////////Functions and EventListeners (add modal)////////////////////////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popupclose) {
  popupclose.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

///// card class factory////////
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

// initialCards.forEach((cardData) => {
//   const cardElement = getCardView(cardData);
//   cardList.append(cardElement);
// });

// function renderCard(cardData) {
//   //Esta funcion se encarga de mostrar los datos que usemos de parametro despues del selector especificado (cardList en este caso)
//   const cardElement = getCardView(cardData);
//   cardList.prepend(cardElement);
// }

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

// profileAddForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = profilePlaceInput.value; //valores que tipeo en los inputs
//   const link = profilePlaceInputUrl.value;
//   renderCard({ name, link }, cardList); // llama esta funcion que toma los datos, mas el blue print de la funcion getCardview (que contiene la clase)
//   closePopup(profileAddModal);
//   profileAddForm.reset(); //resetea la form una vez que se dio el listener (submmit)
// });

///////////////////////////////////////Functions and EventListeners (edit-modal)////////////////////////////////////////////////////

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();

  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  profileEditForm.reset();
});

//////////////////////////////////eventListeners for modal and images /////////////////////////////////////

const popups = document.querySelectorAll(".modal"); ////// recordatorio: Usar las mismas clases para popups
///// remainder : Use the same classes for popups

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(popup);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

////////////// sprint 7 classes////////////////////////////////

function handleImageClick(cardData) {
  modalImageSrc.setAttribute("src", cardData.link);
  modalImageSrc.setAttribute("alt", cardData.name);
  modalImageDescription.textContent = cardData.name;
  openPopup(preViewImageModal);
}

/// functions handlersummitforms

function handleAddFormSubmit(inputValues) {
  console.log(inputValues);

  const { name, link } = inputValues;

  const newCard = new Card(name, link, "#card-template", handleImageClick);
  cardSection.addItem(newCard.getView());

  closePopup(profileAddModal);

  profileAddForm.reset();
}

function handleEditSubmit(title, descripcion) {
  title.textContent = profileTitleInput.value;
  descripcion.textContent = profileDescriptionInput.value;
}

//////// validation class/////////

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidation = new FormValidation(settings, profileEditForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidation(settings, profileAddForm);
addFormValidation.enableValidation();

//// Section class/////

const cardSection = new Section(
  { items: initialCards, renderer: getCardView },
  ".cards__list"
);
cardSection.renderItems();

//// Popups in general /////

const popup = new PopupWithForm({ popupSelector: ".modal" });
popup.open();
popup.close();
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

const popupImage = new PopupWithImage("#preview__image_modal");
popupImage.setEventListeners();

/// User Info class ///

const newUserInfo = UserInfo({
  nameSelector: "#profile__title-input",
  jobSelector: "#profile__description-input",
});

newUserInfo.setUserInfo();
