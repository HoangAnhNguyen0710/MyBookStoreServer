import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateNewUserDto {
  @IsUUID()
  id: string;

  @IsString()
  password_set_token: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatar_url: string;

  @IsString()
  phone_number: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}
