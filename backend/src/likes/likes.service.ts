import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
  constructor(private postsService: PostsService) {}

  like(postId: string, userId: string) {
    return this.postsService.like(postId, userId);
  }
}
