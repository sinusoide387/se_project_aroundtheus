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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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
// I am not seeing the error you mentioned in review. PLEASE provide repro steps.
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
} ///I am not seeing the error you mentioned in review. PLEASE provide repro steps.

function closePopup(popupclose) {
  popupclose.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

function getCardElement(cardData) {
  // console.log(cardData.name);
  const cardElement = cardTemplate.cloneNode(true);

  // access the card title and image and store them in variables
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // like_button
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //// find delete-button///////
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  ///// add event-listener to the delete-button/////
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();

    /// cardElemen.remove()
  });

  //// add a click-listener to the cardImage////
  /// openModal with preViewImageModal
  cardImage.addEventListener("click", () => {
    modalImageSrc.setAttribute("src", cardData.link);
    modalImageSrc.setAttribute("alt", cardData.name);
    modalImageDescription.textContent = cardData.name;
    // preViewImageModal.classList.add("modal_opened");
    openPopup(preViewImageModal);
  });

  // set the path to the image to the link field of the object
  cardImage.setAttribute("src", cardData.link);

  // set the image alt text to the name field of the object
  cardImage.setAttribute("alt", cardData.name);

  // set the card title to the name field of the object, too
  cardTitle.textContent = cardData.name;

  // return the ready HTML element with the filled-in data.
  return cardElement;
}

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

profileAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = profilePlaceInput.value;
  const link = profilePlaceInputUrl.value;
  profileAddForm.reset();
  renderCard({ name, link }, cardList);
  closePopup(profileAddModal);
});

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
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
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
