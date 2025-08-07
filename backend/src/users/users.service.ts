import { Injectable } from '@nestjs/common';
import { User, PublicUser } from './user.entity';

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

  private findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getProfile(id: number): PublicUser | undefined {
    const user = this.findById(id);
    return user ? this.sanitizeUser(user) : undefined;
  }

  sanitizeUser(user: User): PublicUser {
    const { password, ...rest } = user;
    return {
      ...rest,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    };
  }

  follow(followerId: number, followeeId: number): boolean {
    const follower = this.findById(followerId);
    const followee = this.findById(followeeId);
    if (
      !follower ||
      !followee ||
      followerId === followeeId ||
      follower.following.includes(followeeId)
    ) {
      return false;
    }
    follower.following.push(followeeId);
    followee.followers.push(followerId);
    return true;
  }

  unfollow(followerId: number, followeeId: number): boolean {
    const follower = this.findById(followerId);
    const followee = this.findById(followeeId);
    if (!follower || !followee || !follower.following.includes(followeeId)) {
      return false;
    }
    follower.following = follower.following.filter((id) => id !== followeeId);
    followee.followers = followee.followers.filter((id) => id !== followerId);
    return true;
  }

  getAll(): User[] {
    return this.users;
  }
}
