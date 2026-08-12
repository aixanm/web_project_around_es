export class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(descriptionSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            description: this.descriptionElement.textContent || "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
    }
}
