import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AddCommentDto } from '../posts/dto/add-comment.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('posts')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  add(@Param('id') id: string, @Body() body: AddCommentDto) {
    this.commentsService.add(id, body.userId, body.text);
    return { success: true };
  }
}
