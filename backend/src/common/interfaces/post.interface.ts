export interface Post {
  id: string;
  authorId: string;
  text: string;
  mediaUrl?: string;
  likes: Set<string>;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
}
