import { IsEmail, IsString } from 'class-validator';
import { UserRole } from '../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  // @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  // @IsEnum(UserRole)
  // role: UserRole;
}

export class UserBasicInfor {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRole;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: () => UserBasicInfor }) // Liên kết đến class UserBasicInfor
  user: UserBasicInfor;
}

export class VerifyTokenResponseDto {
  @ApiProperty({ type: () => UserBasicInfor }) // Liên kết đến class UserBasicInfor
  user: UserBasicInfor;
}
