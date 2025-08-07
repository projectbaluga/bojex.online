import { IsString } from 'class-validator';

export class FollowDto {
  @IsString()
  followerId!: string;
}
