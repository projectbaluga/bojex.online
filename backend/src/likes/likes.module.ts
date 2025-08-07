import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
