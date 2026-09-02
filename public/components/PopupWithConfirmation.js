import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.handleConfirm = () => { };
        this.confirmButton = this.popupElement.querySelector(".popup__button");
    }
    setConfirmAction(handler) {
        this.handleConfirm = handler;
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => {
            this.handleConfirm();
        });
    }
}
