import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowDto } from './dto/follow.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Post(':id/follow')
  async follow(@Param('id') id: string, @Body() body: FollowDto) {
    const success = await this.usersService.follow(body.followerId, id);
    return { success };
  }

  @Post(':id/unfollow')
  async unfollow(@Param('id') id: string, @Body() body: FollowDto) {
    const success = await this.usersService.unfollow(body.followerId, id);
    return { success };
  }
}
