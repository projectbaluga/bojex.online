import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  create(
    @Body() body: { userId: number; text: string },
    @UploadedFile() file?: any,
  ) {
    const media = file ? file.filename : undefined;
    return this.postsService.create(body.userId, body.text, media);
  }

  @Post(':id/like')
  like(@Param('id') id: string, @Body('userId') userId: number) {
    this.postsService.like(Number(id), userId);
    return { success: true };
  }

  @Post(':id/comments')
  comment(
    @Param('id') id: string,
    @Body() body: { userId: number; text: string },
  ) {
    this.postsService.addComment(Number(id), body.userId, body.text);
    return { success: true };
  }
}
