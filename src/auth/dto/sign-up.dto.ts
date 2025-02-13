import { IsEmail, IsString } from 'class-validator';
import { UpdateNewUserDto } from '../../users/dto/update-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpFirstStepDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class SignUpFirstStepResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  password_set_token: string;
}

export class SignUpSecondStepDto extends UpdateNewUserDto {}
