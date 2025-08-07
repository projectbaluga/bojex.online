import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  userId!: number;

  @IsString()
  @IsNotEmpty()
  text!: string;

  // media path is optional and will be set after file upload processing
  @IsOptional()
  @IsString()
  media?: string;
}
