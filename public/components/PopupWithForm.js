import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        const formData = {};
        inputList.forEach((inputElement) => {
            formData[inputElement.name] = inputElement.value;
        });
        return formData;
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
