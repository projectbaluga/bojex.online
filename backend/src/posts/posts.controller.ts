import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('media'))
  create(
    @Req() req: any,
    @Body() dto: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const mediaUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.postsService.create(req.user.userId, dto.text, mediaUrl);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Param('id') id: string, @Req() req: any) {
    return this.postsService.toggleLike(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  comment(
    @Param('id') id: string,
    @Req() req: any,
    @Body() dto: CreateCommentDto,
  ) {
    return this.postsService.addComment(id, req.user.userId, dto.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.postsService.remove(id, req.user.userId);
  }
}
