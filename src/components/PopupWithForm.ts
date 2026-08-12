import { Popup } from "./Popup.js";

type FormSubmitHandler = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): Record<string, string> {
    const inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input"),
    ) as HTMLInputElement[];

    const formData: Record<string, string> = {};
    inputList.forEach((inputElement) => {
      formData[inputElement.name] = inputElement.value;
    });

    return formData;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      const formData = this.getInputValues();
      this.handleFormSubmit(formData);
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}