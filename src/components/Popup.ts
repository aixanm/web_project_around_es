export class Popup {
  protected popupSelector: string;
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupSelector = popupSelector;
    this.popupElement = document.querySelector(popupSelector) as HTMLElement;
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(data?: unknown): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton = this.popupElement.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this.popupElement.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}