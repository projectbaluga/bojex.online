import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity, UserDocument } from './schemas/user.schema';
import { User } from '../common/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserDocument>) {}

  private toUser(doc: UserDocument): User {
    const { _id, email, password, avatarUrl, bio, followers, following } = doc.toObject();
    return {
      id: _id.toString(),
      email,
      password,
      avatarUrl,
      bio,
      followers,
      following,
    };
  }

  async create(email: string, password: string): Promise<User> {
    const created = new this.userModel({ email, password, followers: [], following: [] });
    await created.save();
    return this.toUser(created);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toUser(user) : null;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUser(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUser(user);
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
