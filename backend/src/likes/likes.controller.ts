import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikePostDto } from '../posts/dto/like-post.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('posts')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  like(@Param('id') id: string, @Body() body: LikePostDto) {
    this.likesService.like(id, body.userId);
    return { success: true };
  }
}
