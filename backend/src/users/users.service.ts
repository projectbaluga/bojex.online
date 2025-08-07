import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { PublicUser } from './user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, password: string): Promise<UserDocument> {
    const user = new this.userModel({ email, password });
    return user.save();
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  getProfile(id: string): Promise<PublicUser | null> {
    return this.userModel
      .findById(id)
      .exec()
      .then((user) => (user ? this.sanitizeUser(user) : null));
  }

  sanitizeUser(user: UserDocument): PublicUser {
    return {
      id: user._id.toString(),
      email: user.email,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    };
  }

  async follow(followerId: string, followeeId: string): Promise<boolean> {
    if (followerId === followeeId) return false;
    const follower = await this.userModel.findById(followerId).exec();
    const followee = await this.userModel.findById(followeeId).exec();
    if (
      !follower ||
      !followee ||
      follower.following.includes(followeeId)
    ) {
      return false;
    }
    follower.following.push(followeeId);
    followee.followers.push(followerId);
    await follower.save();
    await followee.save();
    return true;
  }

  async unfollow(followerId: string, followeeId: string): Promise<boolean> {
    const follower = await this.userModel.findById(followerId).exec();
    const followee = await this.userModel.findById(followeeId).exec();
    if (!follower || !followee || !follower.following.includes(followeeId)) {
      return false;
    }
    follower.following = follower.following.filter((id) => id !== followeeId);
    followee.followers = followee.followers.filter((id) => id !== followerId);
    await follower.save();
    await followee.save();
    return true;
  }
}
