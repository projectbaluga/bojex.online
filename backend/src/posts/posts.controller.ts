import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  create(
    @Req() req,
    @Body() body: { text: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const media = file ? file.filename : undefined;
    return this.postsService.create(req.user.sub, body.text, media);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  like(@Param('id') id: string, @Req() req) {
    this.postsService.like(Number(id), req.user.sub);
    return { success: true };
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  comment(
    @Param('id') id: string,
    @Body() body: { text: string },
    @Req() req,
  ) {
    this.postsService.addComment(Number(id), req.user.sub, body.text);
    return { success: true };
  }
}
