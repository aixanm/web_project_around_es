const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// --- Selección de elementos: perfil ---
const profileEditButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const editModalCloseButton = editModal.querySelector(".popup__close");
const editProfileForm = editModal.querySelector("#edit-profile-form");

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description",
);

const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);

// --- Selección de elementos: agregar tarjeta ---
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardModalCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector("#new-card-form");

const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");

// --- Selección de elementos: imagen ampliada ---
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

// --- Selección de elementos: tarjetas ---
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// --- Abrir y cerrar modales (funciones reutilizables y genéricas) ---
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// --- Perfil: rellenar formulario ---
function fillProfileForm() {
  nameInput.value = profileTitleElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
editModalCloseButton.addEventListener("click", () => closeModal(editModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal(editModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// --- Tarjetas: crear y renderizar ---
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", () => handleCardImageClick(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

// --- Agregar nuevas tarjetas ---
function handleAddCardClick() {
  openModal(newCardModal);
}

addCardButton.addEventListener("click", handleAddCardClick);
newCardModalCloseButton.addEventListener("click", () =>
  closeModal(newCardModal),
);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);

  newCardForm.reset();
  closeModal(newCardModal);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// --- Botón "Me gusta" ---
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// --- Botón "Eliminar" ---
function handleDeleteButtonClick(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

// --- Ampliar imagen ---
function handleCardImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));
