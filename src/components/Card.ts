import type { CardData } from "../types/types.js";

type HandleCardClick = (name: string, link: string) => void;

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;
  private element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: HandleCardClick,
  ) {
    this.name = data.name;
    this.link = data.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.templateSelector,
    ) as HTMLTemplateElement;

    const cardElement = cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private handleLikeButtonClick = (evt: Event): void => {
    const target = evt.target as HTMLElement;
    target.classList.toggle("card__like-button_is-active");
  };

  private handleDeleteButtonClick = (): void => {
    this.element.remove();
  };

  private setEventListeners(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    likeButton.addEventListener("click", this.handleLikeButtonClick);
    deleteButton.addEventListener("click", this.handleDeleteButtonClick);
    cardImage.addEventListener("click", () => {
      this.handleCardClick(this.name, this.link);
    });
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    cardTitle.textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

    this.setEventListeners();

    return this.element;
  }
}