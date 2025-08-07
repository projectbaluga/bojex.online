import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  // media path is optional and will be set after file upload processing
  @IsOptional()
  @IsString()
  media?: string;
}
