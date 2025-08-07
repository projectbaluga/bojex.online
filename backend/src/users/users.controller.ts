import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowDto } from './dto/follow.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfile(id);
  }

  @Post(':id/follow')
  follow(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FollowDto,
  ) {
    const success = this.usersService.follow(body.followerId, id);
    return { success };
  }

  @Post(':id/unfollow')
  unfollow(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FollowDto,
  ) {
    const success = this.usersService.unfollow(body.followerId, id);
    return { success };
  }
}
