import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
export class Post {
  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  mediaUrl?: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
