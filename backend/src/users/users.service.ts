import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, password: string): Promise<User> {
    const created = new this.userModel({ email, password, followers: [], following: [] });
    await created.save();
    return created.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toObject();
  }

  async follow(userId: string, targetId: string) {
    const user = await this.userModel.findById(userId).exec();
    const target = await this.userModel.findById(targetId).exec();
    if (!user || !target) {
      throw new NotFoundException('User not found');
    }
    if (user.following.includes(targetId)) {
      user.following = user.following.filter((id) => id !== targetId);
      target.followers = target.followers.filter((id) => id !== userId);
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
    }
    await user.save();
    await target.save();
    return { following: user.following.length, followers: target.followers.length };
  }
}
