import { IsEmail, IsString } from 'class-validator';
import { UpdateNewUserDto } from '../../users/dto/update-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpFirstStepDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class SignUpSecondStepDto extends UpdateNewUserDto {}
