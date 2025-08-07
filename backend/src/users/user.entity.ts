export interface User {
  id: number;
  email: string;
  password: string;
  followers: number[];
  following: number[];
}
