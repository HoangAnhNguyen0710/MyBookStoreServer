import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}

export class UserBasicInfor {
  email: string;

  name: string;

  role: UserRole;
}

export class LoginResponseDto {
  @ApiProperty() // Fake token example
  accessToken: string;

  @ApiProperty() // Fake token example
  refreshToken: string;

  @ApiProperty({ type: () => UserBasicInfor }) // Liên kết đến class UserBasicInfor
  user: UserBasicInfor;
}

export class VerifyTokenResponseDto {
  @ApiProperty({ type: () => UserBasicInfor }) // Liên kết đến class UserBasicInfor
  user: UserBasicInfor;
}
