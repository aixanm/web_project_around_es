var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/users/me`, {
                headers: { authorization: this.headers.authorization },
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/cards/`, {
                headers: { authorization: this.headers.authorization },
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    editUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/users/me`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/cards/`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: { authorization: this.headers.authorization },
            });
            if (res.ok) {
                return;
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    likeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: { authorization: this.headers.authorization },
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    dislikeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: { authorization: this.headers.authorization },
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            return isLiked ? this.dislikeCard(cardId) : this.likeCard(cardId);
        });
    }
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
}
