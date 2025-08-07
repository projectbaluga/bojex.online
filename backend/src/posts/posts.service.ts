import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument, Comment } from './post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(data: CreatePostDto): Promise<Post> {
    const created = new this.postModel({ ...data, likes: [], comments: [] });
    return created.save();
  }

  findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async like(postId: string, userId: string) {
    await this.postModel
      .updateOne({ _id: postId }, { $addToSet: { likes: userId } })
      .exec();
  }

  async addComment(postId: string, userId: string, text: string) {
    const comment: Comment = { userId, text, createdAt: new Date() } as Comment;
    await this.postModel
      .updateOne({ _id: postId }, { $push: { comments: comment } })
      .exec();
  }
}
