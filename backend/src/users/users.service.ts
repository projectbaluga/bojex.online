import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../common/interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users = new Map<string, User>();

  create(email: string, password: string): User {
    const user: User = { id: uuid(), email, password, followers: [], following: [] };
    this.users.set(email, user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.get(email);
  }

  findById(id: string): User {
    const user = Array.from(this.users.values()).find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  follow(userId: string, targetId: string) {
    const user = this.findById(userId);
    const target = this.findById(targetId);
    if (user.following.includes(targetId)) {
      user.following = user.following.filter((id) => id !== targetId);
      target.followers = target.followers.filter((id) => id !== userId);
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
    }
    return { following: user.following.length, followers: target.followers.length };
  }
}
