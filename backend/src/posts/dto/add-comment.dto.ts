import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddCommentDto {
  @IsInt()
  userId!: number;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
