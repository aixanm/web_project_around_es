import type {
  UserData,
  UserFormData,
  AvatarFormData,
  CardData,
  CardFormData,
} from "../types/types.js";

interface ApiOptions {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
}

export class Api {
  private baseUrl: string;
  private headers: { authorization: string; "Content-Type": string };

  constructor(options: ApiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: { authorization: this.headers.authorization },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this.baseUrl}/cards/`, {
      headers: { authorization: this.headers.authorization },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async editUserInfo(data: UserFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async addCard(data: CardFormData): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: { authorization: this.headers.authorization },
    });
    if (res.ok) {
      return;
    }
    throw new Error(`Error: ${res.status}`);
  }

  async likeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: { authorization: this.headers.authorization },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async dislikeCard(cardId: string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: { authorization: this.headers.authorization },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return isLiked ? this.dislikeCard(cardId) : this.likeCard(cardId);
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }
}