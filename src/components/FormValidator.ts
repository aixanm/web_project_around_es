interface FormValidatorConfig {
  formSelector: string;
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
}

export class FormValidator {
  private config: FormValidatorConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormValidatorConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector),
    );
    this.buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector,
    ) as HTMLButtonElement;
  }

  private showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`,
    ) as HTMLElement;
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some(
      (inputElement) => !inputElement.validity.valid,
    );
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.formElement.setAttribute("novalidate", "true");
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}