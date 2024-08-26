export type Game = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  genre: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  email_verify: boolean;
  roles: string[];
  deletedAt: string | null;
  games: Game[];
  createdAt: string;
  updatedAt: string;
};
