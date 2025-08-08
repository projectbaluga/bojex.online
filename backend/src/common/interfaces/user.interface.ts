export interface User {
  id: string;
  email: string;
  password: string;
  avatarUrl?: string;
  bio?: string;
  followers: string[];
  following: string[];
}
