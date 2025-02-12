import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({
    example: 'Penguin Random House',
    description: 'Tên nhà xuất bản',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'https://www.penguinrandomhouse.com',
    description: 'Website của nhà xuất bản',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;

  @ApiPropertyOptional({
    example: 'contact@publisher.com',
    description: 'Email liên hệ',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  contact_email?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Số điện thoại liên hệ',
  })
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(20)
  phone_number?: string;

  @ApiPropertyOptional({
    example: '123 Main Street, New York, USA',
    description: 'Địa chỉ nhà xuất bản',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'USA', description: 'Quốc gia' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;
}
