import { Length, IsEmail, IsString } from 'class-validator';

export class NewUserDto {
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;

  @IsString()
  role: string;
}
