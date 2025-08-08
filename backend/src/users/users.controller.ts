import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { z } from 'zod';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getProfile(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
  ) {
    const { password, ...user } = await this.usersService.findById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  follow(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
  ) {
    return this.usersService.follow(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', new ZodValidationPipe(z.string().length(24))) id: string,
    @Req() req: any,
    @Body() dto: UpdateUserDto,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('Cannot update other users');
    }
    return this.usersService.update(id, dto);
  }
}
