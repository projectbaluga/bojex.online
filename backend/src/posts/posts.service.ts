import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private nextId = 1;

  create(data: CreatePostDto): Post {
    const post: Post = {
      id: this.nextId++,
      userId: data.userId,
      text: data.text,
      media: data.media,
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
