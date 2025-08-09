import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../common/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(email: string, password: string): Promise<User> {
    const user: User = { id: uuid(), email, password, followers: [], following: [] };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return user;
  }

  async follow(userId: string, targetId: string) {
    const user = await this.findById(userId);
    const target = await this.findById(targetId);
    const isFollowing = user.following.includes(targetId);
    if (isFollowing) {
      user.following = user.following.filter((id) => id !== targetId);
      target.followers = target.followers.filter((id) => id !== userId);
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
    }
    return { following: !isFollowing };
  }
}
