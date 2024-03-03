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

console.log(initialCards);

///////////////////////////////////////Elements/////////////////////////////////////////////////////////////
const ProfileEditButton = document.querySelector("#profile__edit-button");

const ProfileEditModal = document.querySelector("#profile__edit-modal");

const PofileCloseButton = document.querySelector("#profile__close-modal");

const ProfileTitle = document.querySelector("#profile__title");

const ProfileTitleInput = document.querySelector("#profile__title-input");

const ProfileDescription = document.querySelector("#profile__description");

const ProfileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

const ProfileEditForm = ProfileEditModal.querySelector(".modal__form");

const CardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const CardList = document.querySelector(".cards__list");

//////////////////////////////////////Functions and EventListeners////////////////////////////////////////////////////////////

ProfileEditButton.addEventListener("click", () => {
  ProfileTitleInput.value = ProfileTitle.textContent.trim();
  ProfileDescriptionInput.value = ProfileDescription.textContent.trim();
  console.log("click");
  ProfileEditModal.classList.add("modal__opened");
});

function ClosePopop() {
  ProfileEditModal.classList.remove("modal__opened");
}

PofileCloseButton.addEventListener("click", () => {
  console.log("click");
  ClosePopop();
});

ProfileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  ProfileTitle.textContent = ProfileTitleInput.value;
  ProfileDescription.textContent = ProfileDescriptionInput.value;
  ClosePopop();
});

function getCardElement(cardData) {
  // console.log(cardData.name);
  const CardElement = CardTemplate.cloneNode(true);

  // access the card title and image and store them in variables
  const CardImage = CardElement.querySelector(".card__image");
  const CardTitle = CardElement.querySelector(".card__title");

  // set the path to the image to the link field of the object
  CardImage.setAttribute("src", cardData.link);

  // set the image alt text to the name field of the object
  CardImage.setAttribute("alt", cardData.name);

  // set the card title to the name field of the object, too
  CardTitle.textContent = cardData.name;

  // return the ready HTML element with the filled-in data.
  return CardElement;
}

initialCards.forEach((cardData) => {
  const CardElement = getCardElement(cardData);
  CardList.append(CardElement);
});
