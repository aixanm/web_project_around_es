import type { CardData } from "../types/types.js";

type HandleCardClick = (name: string, link: string) => void;
type HandleDeleteClick = (cardId: string, onSuccess: () => void) => void;
type HandleLikeClick = (
  cardId: string,
  isLiked: boolean,
) => Promise<CardData>;

export class Card {
  private id: string;
  private name: string;
  private link: string;
  private owner: string;
  private isLiked: boolean;
  private templateSelector: string;
  private currentUserId: string;
  private handleCardClick: HandleCardClick;
  private handleDeleteClick: HandleDeleteClick;
  private handleLikeClick: HandleLikeClick;
  private element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    currentUserId: string,
    handleCardClick: HandleCardClick,
    handleDeleteClick: HandleDeleteClick,
    handleLikeClick: HandleLikeClick,
  ) {
    this.id = data._id;
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this.isLiked = data.isLiked;
    this.templateSelector = templateSelector;
    this.currentUserId = currentUserId;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
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

  private updateLikeButtonState(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
  }

  public setLikeStatus(isLiked: boolean): void {
    this.isLiked = isLiked;
    this.updateLikeButtonState();
  }

  public getId(): string {
    return this.id;
  }

  public remove(): void {
    this.element.remove();
  }

  private handleLikeButtonClick = (): void => {
    this.handleLikeClick(this.id, this.isLiked)
      .then((updatedCard) => {
        this.setLikeStatus(updatedCard.isLiked);
      })
      .catch((err) => console.error(err));
  };

  private handleDeleteButtonClick = (): void => {
    this.handleDeleteClick(this.id, () => this.remove());
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
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;

    cardTitle.textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

    this.updateLikeButtonState();

    if (this.owner !== this.currentUserId) {
      deleteButton.remove();
    }

    this.setEventListeners();

    return this.element;
  }
}