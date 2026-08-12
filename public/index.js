import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
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
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
// --- Selección de elementos: agregar tarjeta ---
const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
// --- Información del usuario ---
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
// --- Validación de formularios ---
const editFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
editFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();
// --- Popups ---
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function handleProfileFormSubmit(formData) {
    userInfo.setUserInfo({
        name: formData.name,
        description: formData.description,
    });
    editFormPopup.close();
}
const editFormPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
editFormPopup.setEventListeners();
function handleCardFormSubmit(formData) {
    const newCardData = {
        name: formData["place-name"],
        link: formData.link,
    };
    const card = new Card(newCardData, "#card-template", handleCardImageClick);
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
    newCardFormPopup.close();
}
const newCardFormPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
newCardFormPopup.setEventListeners();
// --- Perfil: abrir modal de edición ---
function fillProfileForm() {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.description;
}
function handleOpenEditModal() {
    fillProfileForm();
    editFormValidator.resetValidation();
    editFormPopup.open();
}
profileEditButton.addEventListener("click", handleOpenEditModal);
// --- Ampliar imagen ---
function handleCardImageClick(name, link) {
    imagePopup.open({ name, link });
}
// --- Tarjetas: crear y renderizar ---
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", handleCardImageClick);
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
cardSection.renderItems();
// --- Agregar nuevas tarjetas ---
function handleAddCardClick() {
    newCardFormValidator.resetValidation();
    newCardFormPopup.open();
}
addCardButton.addEventListener("click", handleAddCardClick);
