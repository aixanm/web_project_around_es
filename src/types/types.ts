// --- Tarjetas ---
export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

// --- Usuario ---
export interface UserFormData {
  name: string;
  about: string;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface AvatarFormData {
  avatar: string;
}