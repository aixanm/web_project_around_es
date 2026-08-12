import { Popup } from "./Popup.js";
import type { CardData } from "../types/types.js";

export class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.imageElement = this.popupElement.querySelector(
      ".popup__image",
    ) as HTMLImageElement;
    this.captionElement = this.popupElement.querySelector(
      ".popup__caption",
    ) as HTMLElement;
  }

  public open(data: CardData): void {
    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.captionElement.textContent = data.name;

    super.open();
  }
}