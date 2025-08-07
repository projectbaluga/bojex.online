import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(private postsService: PostsService) {}

  add(postId: string, userId: string, text: string) {
    return this.postsService.addComment(postId, userId, text);
  }
}
