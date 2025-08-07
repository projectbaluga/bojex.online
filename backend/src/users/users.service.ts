import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(email: string, password: string): User {
    const user: User = {
      id: this.nextId++,
      email,
      password,
      followers: [],
      following: [],
    };
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  follow(followerId: number, followeeId: number): void {
    const follower = this.findById(followerId);
    const followee = this.findById(followeeId);
    if (follower && followee && !follower.following.includes(followeeId)) {
      follower.following.push(followeeId);
      followee.followers.push(followerId);
    }
  }

  getAll(): User[] {
    return this.users;
  }
}
