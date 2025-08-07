export interface Comment {
  userId: number;
  text: string;
}

export interface Post {
  id: number;
  userId: number;
  text: string;
  media?: string;
  likes: number[];
  comments: Comment[];
  createdAt: Date;
}
