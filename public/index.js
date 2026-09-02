var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "cdb73c64-40c2-4f87-abc0-e2446e7144b4",
        "Content-Type": "application/json",
    },
});
let currentUserId = "";
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const profileImage = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const avatarForm = document.querySelector("#avatar-form");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
const editFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
editFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarFormValidator.enableValidation();
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const deleteConfirmPopup = new PopupWithConfirmation("#confirm-delete-popup");
deleteConfirmPopup.setEventListeners();
function handleCardImageClick(name, link) {
    imagePopup.open({ name, link });
}
function handleDeleteClick(cardId, onSuccess) {
    deleteConfirmPopup.setConfirmAction(() => __awaiter(this, void 0, void 0, function* () {
        try {
            yield api.deleteCard(cardId);
            onSuccess();
            deleteConfirmPopup.close();
        }
        catch (err) {
            console.error(err);
        }
    }));
    deleteConfirmPopup.open();
}
function handleLikeClick(cardId, isLiked) {
    return __awaiter(this, void 0, void 0, function* () {
        return api.changeLikeCardStatus(cardId, isLiked);
    });
}
function createCard(data) {
    const card = new Card(data, "#card-template", currentUserId, handleCardImageClick, handleDeleteClick, handleLikeClick);
    return card.generateCard();
}
const cardSection = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
function handleProfileFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        editFormPopup.setSubmitButtonText("Guardando...");
        try {
            const updatedUser = yield api.editUserInfo({
                name: formData.name.trim(),
                about: formData.description.trim(),
            });
            userInfo.setUserInfo({
                name: updatedUser.name,
                description: updatedUser.about,
            });
            editFormPopup.close();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            editFormPopup.resetSubmitButtonText();
        }
    });
}
const editFormPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
editFormPopup.setEventListeners();
function handleCardFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        newCardFormPopup.setSubmitButtonText("Guardando...");
        try {
            const newCardData = yield api.addCard({
                name: formData["place-name"].trim(),
                link: formData.link.trim(),
            });
            const cardElement = createCard(newCardData);
            cardSection.addItem(cardElement);
            newCardFormPopup.close();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            newCardFormPopup.resetSubmitButtonText();
        }
    });
}
const newCardFormPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
newCardFormPopup.setEventListeners();
function handleAvatarFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        avatarPopup.setSubmitButtonText("Guardando...");
        try {
            const updatedUser = yield api.updateAvatar({
                avatar: formData.avatar.trim(),
            });
            profileImage.src = updatedUser.avatar;
            avatarPopup.close();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            avatarPopup.resetSubmitButtonText();
        }
    });
}
const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
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
function handleAddCardClick() {
    newCardFormValidator.resetValidation();
    newCardFormPopup.open();
}
addCardButton.addEventListener("click", handleAddCardClick);
function loadInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            currentUserId = userData._id;
            userInfo.setUserInfo({
                name: userData.name,
                description: userData.about,
            });
            profileImage.src = userData.avatar;
            cardSection.renderItems(initialCards);
        }
        catch (err) {
            console.error("Fallo al cargar datos iniciales:", err);
        }
    });
}
loadInitialData();
