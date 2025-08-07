import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { uploadConfig } from './upload-config';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', uploadConfig))
  create(@Body() body: CreatePostDto, @UploadedFile() file?: any) {
    const media = file ? file.path : undefined;
    body.media = media;
    return this.postsService.create(body);
  }

}
