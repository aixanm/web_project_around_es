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

initialCards.forEach(function (card) {
  console.log(card.name);
});

// --- Selección de elementos ---
const profileEditButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const editModalCloseBtn = editModal.querySelector(".popup__close");
const editForm = editModal.querySelector("#edit-profile-form");

const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);

// --- 1. Abrir y cerrar el modal ---
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// --- 2. Rellenar el formulario ---
function fillProfileForm() {
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
editModalCloseBtn.addEventListener("click", () => closeModal(editModal));

// --- 3. Editar nombre y descripción al enviar el formulario ---
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = nameInput.value;
  profileDescriptionEl.textContent = descriptionInput.value;

  closeModal(editModal);
}

editForm.addEventListener("submit", handleProfileFormSubmit);
