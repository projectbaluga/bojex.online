import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private nextId = 1;

  create(userId: number, text: string, media?: string): Post {
    const post: Post = {
      id: this.nextId++,
      userId,
      text,
      media,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };
    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  like(postId: number, userId: number) {
    const post = this.posts.find((p) => p.id === postId);
    if (post && !post.likes.includes(userId)) {
      post.likes.push(userId);
    }
  }

  addComment(postId: number, userId: number, text: string) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push({ userId, text });
    }
  }
}
