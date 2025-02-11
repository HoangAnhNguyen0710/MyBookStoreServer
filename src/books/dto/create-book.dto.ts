import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  IsPositive,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../entities/book.entity';

export class Dimensions {
  @ApiProperty({ example: '20cm' })
  @IsString()
  height: string;

  @ApiProperty({ example: '15cm' })
  @IsString()
  width: string;

  @ApiProperty({ example: '2cm' })
  @IsString()
  thickness: string;
}

export class BookItem {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  author: string;

  @ApiProperty({ example: '978-0743273565' })
  @IsString()
  isbn: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  publisherId: number;

  @ApiProperty({ example: '1925-04-10', type: String })
  @IsDate()
  @Type(() => Date)
  publication_date: Date;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50 })
  @IsInt()
  @IsPositive()
  stock_quantity: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ example: 'English', enum: Language })
  @IsString()
  language: Language;

  @ApiProperty({ example: 180 })
  @IsInt()
  @IsPositive()
  page_count: number;

  @ApiProperty({ example: 'A classic novel...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Hardcover', required: false })
  @IsOptional()
  @IsString()
  format?: string;

  @ApiProperty({ required: false, type: () => Dimensions })
  @IsOptional()
  @ValidateNested()
  @Type(() => Dimensions)
  dimensions?: Dimensions;

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

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 200 })
  @IsInt()
  number_of_reviews: number;

  @ApiProperty({
    example: ['fiction', 'classic'],
    required: false,
    type: [String],
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

export class CreateBookDto {
  @ApiProperty({ type: [BookItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookItem)
  list: BookItem[];
}
