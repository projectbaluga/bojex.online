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
  Query,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { z } from 'zod';

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
  findOne(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
  ) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @HttpCode(200)
  like(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
  ) {
    return this.postsService.likePost(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlike(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
  ) {
    return this.postsService.unlikePost(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  comment(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
    @Body(new ZodValidationPipe(z.object({ content: z.string().min(1).max(200) })))
    body: { content: string },
  ) {
    return this.postsService.addComment(id, req.user.userId, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId/comments/:commentId')
  deleteComment(
    @Param('postId', new ZodValidationPipe(z.string().length(24))) postId: string,
    @Param('commentId', new ZodValidationPipe(z.string().uuid())) commentId: string,
    @Req() req: any,
  ) {
    return this.postsService.removeComment(postId, commentId, req.user.userId);
  }

  @Get(':id/comments')
  getComments(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Query(
      new ZodValidationPipe(
        z.object({
          page: z.coerce.number().min(1).default(1).optional(),
          limit: z.coerce.number().min(1).max(50).default(10).optional(),
          sort: z.enum(['latest', 'oldest']).default('latest').optional(),
        }),
      ),
    )
    query: {
      page?: number;
      limit?: number;
      sort?: 'latest' | 'oldest';
    },
  ) {
    return this.postsService.getComments(id, query.page, query.limit, query.sort);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
  ) {
    return this.postsService.remove(id, req.user.userId);
  }
}
