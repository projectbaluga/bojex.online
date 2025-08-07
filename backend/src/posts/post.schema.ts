import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  text!: string;

  @Prop()
  media?: string;

  @Prop({ type: [String], default: [] })
  likes!: string[];

  @Prop({ type: [CommentSchema], default: [] })
  comments!: Comment[];
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
