import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateNewUserDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  password_set_token: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar_url: string;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}
