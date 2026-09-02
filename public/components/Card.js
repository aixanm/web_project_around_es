export class Card {
    constructor(data, templateSelector, currentUserId, handleCardClick, handleDeleteClick, handleLikeClick) {
        this.handleLikeButtonClick = () => {
            this.handleLikeClick(this.id, this.isLiked)
                .then((updatedCard) => {
                this.setLikeStatus(updatedCard.isLiked);
            })
                .catch((err) => console.error(err));
        };
        this.handleDeleteButtonClick = () => {
            this.handleDeleteClick(this.id, () => this.remove());
        };
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
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        const cardElement = cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    updateLikeButtonState() {
        const likeButton = this.element.querySelector(".card__like-button");
        likeButton.classList.toggle("card__like-button_is-active", this.isLiked);
    }
    setLikeStatus(isLiked) {
        this.isLiked = isLiked;
        this.updateLikeButtonState();
    }
    getId() {
        return this.id;
    }
    remove() {
        this.element.remove();
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
        const deleteButton = this.element.querySelector(".card__delete-button");
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
