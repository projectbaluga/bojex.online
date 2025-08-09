import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Post, Comment } from '../common/interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  async create(authorId: string, text: string, mediaUrl?: string): Promise<Post> {
    const post: Post = {
      id: uuid(),
      authorId,
      text,
      mediaUrl,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };
    this.posts.push(post);
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async likePost(id: string, userId: string) {
    const post = await this.findOne(id);
    const liked = post.likes.includes(userId);
    if (liked) {
      post.likes = post.likes.filter((u) => u !== userId);
    } else {
      post.likes.push(userId);
    }
    return { liked: !liked, likes: post.likes.length };
  }

  async addComment(id: string, authorId: string, content: string) {
    const post = await this.findOne(id);
    const comment: Comment = {
      id: uuid(),
      authorId,
      content,
      createdAt: new Date(),
    };
    post.comments.push(comment);
    return comment;
  }

  async getComments(id: string, page = 1, limit = 10, sort: 'latest' | 'oldest' = 'latest') {
    const post = await this.findOne(id);
    const sorted = [...post.comments].sort((a, b) =>
      sort === 'latest'
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );
    const start = (page - 1) * limit;
    const comments = sorted.slice(start, start + limit);
    return { total: sorted.length, comments };
  }

  async removeComment(postId: string, commentId: string, userId: string) {
    const post = await this.findOne(postId);
    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== userId && post.authorId !== userId) {
      throw new ForbiddenException('Cannot delete this comment');
    }
    post.comments = post.comments.filter((c) => c.id !== commentId);
    return { deleted: true };
  }

  async remove(id: string, userId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Cannot delete this post');
    }
    this.posts = this.posts.filter((p) => p.id !== id);
    return { deleted: true };
  }
}
