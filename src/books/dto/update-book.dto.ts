import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  IsPositive,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookStatus, Language } from '../../constants/constants';

export class UpdateDimensions {
  @ApiProperty({ example: '20cm', required: false })
  @IsOptional()
  @IsString()
  height?: string;

  @ApiProperty({ example: '15cm', required: false })
  @IsOptional()
  @IsString()
  width?: string;

  @ApiProperty({ example: '2cm', required: false })
  @IsOptional()
  @IsString()
  thickness?: string;
}

export class UpdateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ example: '978-0743273565', required: false })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiProperty({
    example: 2,
    description: 'ID của nhà xuất bản',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  publisherId?: number;

  @ApiProperty({ example: '1925-04-10', required: false, type: String })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publication_date?: Date;

  @ApiProperty({ example: 19.99, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  stock_quantity?: number;

  @ApiProperty({
    example: 1,
    description: 'ID của danh mục sách',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ example: 'English', enum: Language, required: false })
  @IsOptional()
  @IsString()
  language?: Language;

  @ApiProperty({ example: 'AVAILABLE', enum: BookStatus, required: false })
  @IsOptional()
  @IsString()
  status?: BookStatus;

  @ApiProperty({ example: 180, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  page_count?: number;

  @ApiProperty({ example: 'A classic novel...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Hardcover', required: false })
  @IsOptional()
  @IsString()
  format?: string;

  @ApiProperty({ required: false, type: () => UpdateDimensions })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateDimensions)
  dimensions?: UpdateDimensions;

  @ApiProperty({ example: '500g', required: false })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiProperty({
    example: 'https://example.com/book-cover.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  cover_image_url?: string;

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 200, required: false })
  @IsOptional()
  @IsInt()
  number_of_reviews?: number;

  @ApiProperty({
    example: ['fiction', 'classic'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: 'First Edition', required: false })
  @IsOptional()
  @IsString()
  edition?: string;

  @ApiProperty({ example: 'The Great Gatsby Series', required: false })
  @IsOptional()
  @IsString()
  series?: string;
}
