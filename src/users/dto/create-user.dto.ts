import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  password_set_token: string;
}
