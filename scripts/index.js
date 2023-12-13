import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

//console.log(typeof initialCards);
const cardData = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

/* -------------------------------------------------------------------------- */
/*                                 Card-Card Class                            */
/* -------------------------------------------------------------------------- */

const card = new Card(cardData, "#card-template");
card.getView();

//* -------------------------------------------------------------------------- */
/*                                Card Template                               */
/* -------------------------------------------------------------------------- */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewCardModal = document.querySelector("#preview-card-modal");
const modalPreviewImageElement = document.querySelector(
  ".modal__preview-image"
);

const profileEditModalCloseButton = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);

const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const previewCardModalCloseButton = previewCardModal.querySelector(
  "#preview-card-modal-close-button"
);

const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.forms["profile-edit-form"];

const addCardFormElement = document.forms["add-card-form"];

const cardsWrap = document.querySelector(".cards__list");

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  Validation                                */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardFormElement);
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    //console.log(modal);
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
  return;
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
  return;
}

function foundModalOpened(evt, modal) {
  if (evt.target.classList.contains("modal_opened")) {
    console.log(evt.target.classList);
    closeModal(modal);
  }
}

previewCardModal.addEventListener("click", function (evt) {
  foundModalOpened(evt, previewCardModal);
});

profileEditModal.addEventListener("click", function (evt) {
  foundModalOpened(evt, profileEditModal);
});

addCardModal.addEventListener("click", function (evt) {
  foundModalOpened(evt, addCardModal);
});

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  return;
}

function renderCard(cardData, wrapper) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).getView();
  wrapper.prepend(cardElement);
}

function pressDeleteButton(cardElement) {}

function toggleLikeButton(cardElement) {}

function handleImageClick(cardImageElement, cardTitleElement) {
  console.log(cardImageElement);
  //cardImageElement.addEventListener("click", () => {
  const modalCaption = document.querySelector(".modal__caption");
  openModal(previewCardModal);
  modalPreviewImageElement.src = cardImageElement.src;
  modalPreviewImageElement.alt = cardImageElement.alt;
  modalCaption.textContent = cardTitleElement.textContent;
  return;
  //});
}

function getCardElement(cardData) {}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  return;
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);

  //console.log(addCardFormElement);
  addCardFormElement.reset();
  return;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewCardModalCloseButton.addEventListener("click", () =>
  closeModal(previewCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
