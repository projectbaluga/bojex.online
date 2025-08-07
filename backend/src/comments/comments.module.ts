import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
