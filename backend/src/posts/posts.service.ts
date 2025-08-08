import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Comment } from '../common/interfaces/post.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private posts = new Map<string, Post>();

  create(authorId: string, text: string, mediaUrl?: string): Post {
    const post: Post = {
      id: uuid(),
      authorId,
      text,
      mediaUrl,
      likes: new Set(),
      comments: [],
      createdAt: new Date(),
    };
    this.posts.set(post.id, post);
    return post;
  }

  findAll(): Post[] {
    return Array.from(this.posts.values());
  }

  findOne(id: string): Post {
    const post = this.posts.get(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  toggleLike(id: string, userId: string) {
    const post = this.findOne(id);
    if (post.likes.has(userId)) {
      post.likes.delete(userId);
    } else {
      post.likes.add(userId);
    }
    return { likes: post.likes.size };
  }

  addComment(id: string, authorId: string, content: string) {
    const post = this.findOne(id);
    const comment: Comment = { id: uuid(), authorId, content, createdAt: new Date() };
    post.comments.push(comment);
    return comment;
  }
}
