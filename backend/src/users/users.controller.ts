import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @Post(':id/follow')
  follow(
    @Param('id') id: string,
    @Body('followerId') followerId: number,
  ) {
    this.usersService.follow(followerId, Number(id));
    return { success: true };
  }
}
