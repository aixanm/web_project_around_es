export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.handleLikeButtonClick = (evt) => {
            const target = evt.target;
            target.classList.toggle("card__like-button_is-active");
        };
        this.handleDeleteButtonClick = () => {
            this.element.remove();
        };
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        const cardElement = cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    setEventListeners() {
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        const cardImage = this.element.querySelector(".card__image");
        likeButton.addEventListener("click", this.handleLikeButtonClick);
        deleteButton.addEventListener("click", this.handleDeleteButtonClick);
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.name, this.link);
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardTitle = this.element.querySelector(".card__title");
        const cardImage = this.element.querySelector(".card__image");
        cardTitle.textContent = this.name;
        cardImage.src = this.link;
        cardImage.alt = this.name;
        this.setEventListeners();
        return this.element;
    }
}
