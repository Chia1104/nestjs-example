import { Length, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserInput {
  @Length(3, 20)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  password: string;

  @IsEnum(['user', 'admin'], {
    message: 'role must be one of the following values: user, admin',
  })
  @ApiProperty()
  role: string;
}
