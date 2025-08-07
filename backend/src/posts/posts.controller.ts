import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { uploadConfig } from './upload-config';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', uploadConfig))
  create(
    @Body() body: CreatePostDto,
    @UploadedFile() file?: any,
  ) {
    const media = file ? file.path : undefined;
    body.media = media;
    return this.postsService.create(body);
  }

  @Post(':id/like')
  like(@Param('id', ParseIntPipe) id: number, @Body() body: LikePostDto) {
    this.postsService.like(id, body.userId);
    return { success: true };
  }

  @Post(':id/comments')
  comment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AddCommentDto,
  ) {
    this.postsService.addComment(id, body.userId, body.text);
    return { success: true };
  }
}
