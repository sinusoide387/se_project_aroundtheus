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
