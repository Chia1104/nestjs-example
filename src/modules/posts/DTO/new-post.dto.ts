import { Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { type UserCreatePost } from '../../../util/types/user-create-post';

export class NewPostDto {
  @Length(1, 50)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  user: UserCreatePost;
}
