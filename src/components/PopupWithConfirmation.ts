import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private confirmButton: HTMLButtonElement;
  private handleConfirm: () => void = () => {};

  constructor(popupSelector: string) {
    super(popupSelector);
    this.confirmButton = this.popupElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;
  }

  public setConfirmAction(handler: () => void): void {
    this.handleConfirm = handler;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this.confirmButton.addEventListener("click", () => {
      this.handleConfirm();
    });
  }
}