import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
const multer = require('multer');

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req: any, file: any, cb: any) => {
          const ext = extname(file.originalname);
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      fileFilter: (req: any, file: any, cb: any) => {
        const allowed = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'video/mp4',
        ];
        if (!allowed.includes(file.mimetype)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  create(
    @Body() body: CreatePostDto,
    @UploadedFile() file?: any,
  ) {
    const media = file ? file.path : undefined;
    body.media = media;
    return this.postsService.create(body);
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
