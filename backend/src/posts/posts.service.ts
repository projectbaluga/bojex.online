import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async likePost(id: string, userId: string) {
    const res = await this.postModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { likes: userId } },
        { new: true },
      )
      .exec();
    if (!res) throw new NotFoundException('Post not found');
    return { likes: res.likes.length };
  }

  async unlikePost(id: string, userId: string) {
    const res = await this.postModel
      .findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true },
      )
      .exec();
    if (!res) throw new NotFoundException('Post not found');
    return { likes: res.likes.length };
  }

  async addComment(id: string, authorId: string, content: string) {
    const comment: Comment = {
      id: uuid(),
      authorId,
      content,
      createdAt: new Date(),
    };
    const res = await this.postModel
      .findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        { new: true },
      )
      .exec();
    if (!res) throw new NotFoundException('Post not found');
    return comment;
  }

  async getComments(
    id: string,
    page = 1,
    limit = 10,
    sort: 'latest' | 'oldest' = 'latest',
  ) {
    const post = await this.postModel
      .findById(id, { comments: 1 })
      .exec();
    if (!post) throw new NotFoundException('Post not found');
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
    const post = await this.postModel.findById(postId).exec();
    if (!post) throw new NotFoundException('Post not found');
    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== userId && post.authorId !== userId) {
      throw new ForbiddenException('Cannot delete this comment');
    }
    await this.postModel
      .updateOne({ _id: postId }, { $pull: { comments: { id: commentId } } })
      .exec();
    return { deleted: true };
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
