import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import type { CardData } from "./types/types.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "cdb73c64-40c2-4f87-abc0-e2446e7144b4",
    "Content-Type": "application/json",
  },
});

let currentUserId = "";

const profileEditButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const editProfileForm = document.querySelector(
  "#edit-profile-form",
) as HTMLFormElement;

const nameInput = document.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;

const addCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;
const newCardForm = document.querySelector(
  "#new-card-form",
) as HTMLFormElement;

const profileImage = document.querySelector(
  ".profile__image",
) as HTMLImageElement;
const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button",
) as HTMLButtonElement;
const avatarForm = document.querySelector("#avatar-form") as HTMLFormElement;

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

function handleCardImageClick(name: string, link: string): void {
  imagePopup.open({ name, link });
}

function handleDeleteClick(cardId: string, onSuccess: () => void): void {
  deleteConfirmPopup.setConfirmAction(async () => {
    try {
      await api.deleteCard(cardId);
      onSuccess();
      deleteConfirmPopup.close();
    } catch (err) {
      console.error(err);
    }
  });
  deleteConfirmPopup.open();
}

async function handleLikeClick(
  cardId: string,
  isLiked: boolean,
): Promise<CardData> {
  return api.changeLikeCardStatus(cardId, isLiked);
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(
    data,
    "#card-template",
    currentUserId,
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick,
  );
  return card.generateCard();
}

const cardSection = new Section<CardData>(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

async function handleProfileFormSubmit(
  formData: Record<string, string>,
): Promise<void> {
  editFormPopup.setSubmitButtonText("Guardando...");
  try {
    const updatedUser = await api.editUserInfo({
      name: formData.name.trim(),
      about: formData.description.trim(),
    });
    userInfo.setUserInfo({
      name: updatedUser.name,
      description: updatedUser.about,
    });
    editFormPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    editFormPopup.resetSubmitButtonText();
  }
}

const editFormPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
editFormPopup.setEventListeners();

async function handleCardFormSubmit(
  formData: Record<string, string>,
): Promise<void> {
  newCardFormPopup.setSubmitButtonText("Guardando...");
  try {
    const newCardData = await api.addCard({
      name: formData["place-name"].trim(),
      link: formData.link.trim(),
    });
    const cardElement = createCard(newCardData);
    cardSection.addItem(cardElement);
    newCardFormPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    newCardFormPopup.resetSubmitButtonText();
  }
}

const newCardFormPopup = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);
newCardFormPopup.setEventListeners();

async function handleAvatarFormSubmit(
  formData: Record<string, string>,
): Promise<void> {
  avatarPopup.setSubmitButtonText("Guardando...");
  try {
    const updatedUser = await api.updateAvatar({
      avatar: formData.avatar.trim(),
    });
    profileImage.src = updatedUser.avatar;
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    avatarPopup.resetSubmitButtonText();
  }
}

const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

function fillProfileForm(): void {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.description;
}

function handleOpenEditModal(): void {
  fillProfileForm();
  editFormValidator.resetValidation();
  editFormPopup.open();
}

profileEditButton.addEventListener("click", handleOpenEditModal);

function handleAddCardClick(): void {
  newCardFormValidator.resetValidation();
  newCardFormPopup.open();
}

addCardButton.addEventListener("click", handleAddCardClick);

async function loadInitialData(): Promise<void> {
  try {
    const [userData, initialCards] = await Promise.all([
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
  } catch (err) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}

loadInitialData();