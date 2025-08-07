import { IsString, IsNotEmpty } from 'class-validator';

export class AddCommentDto {
  @IsString()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
