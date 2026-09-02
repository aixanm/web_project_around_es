import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.submitButtonDefaultText = this.submitButton
            ? this.submitButton.textContent || "Guardar"
            : "Guardar";
    }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        const formData = {};
        inputList.forEach((inputElement) => {
            formData[inputElement.name] = inputElement.value;
        });
        return formData;
    }
    setSubmitButtonText(text) {
        if (this.submitButton) {
            this.submitButton.textContent = text;
        }
    }
    resetSubmitButtonText() {
        this.setSubmitButtonText(this.submitButtonDefaultText);
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const formData = this.getInputValues();
            this.handleFormSubmit(formData);
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
