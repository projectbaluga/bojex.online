import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Post, PostDocument, Comment } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(authorId: string, text: string, mediaUrl?: string): Promise<Post> {
    const post = await this.postModel.create({ authorId, text, mediaUrl });
    return post.toObject();
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts.map((p) => p.toObject());
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Post not found');
    return post.toObject();
  }

  async toggleLike(id: string, userId: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Post not found');
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((u) => u !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return { likes: post.likes.length };
  }

  async addComment(id: string, authorId: string, content: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Post not found');
    const comment: Comment = { id: uuid(), authorId, content, createdAt: new Date() };
    post.comments.push(comment);
    await post.save();
    return comment;
  }

  async remove(id: string, userId: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) {
      throw new ForbiddenException('Cannot delete this post');
    }
    await post.deleteOne();
    return { deleted: true };
  }
}
