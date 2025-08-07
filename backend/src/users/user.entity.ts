export interface User {
  id: number;
  email: string;
  password: string;
  followers: number[];
  following: number[];
}

export interface PublicUser {
  id: number;
  email: string;
  followers: number[];
  following: number[];
  followersCount: number;
  followingCount: number;
}
