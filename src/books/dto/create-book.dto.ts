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
import { Language } from '../entities/book.entity';

export class Dimensions {
  @IsString()
  height: string;

  @IsString()
  width: string;

  @IsString()
  thickness: string;
}

export class BookItem {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsOptional()
  @IsNumber()
  publisherId: number;

  @IsDate()
  @Type(() => Date)
  publication_date: Date;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock_quantity: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsString()
  language: Language;

  @IsInt()
  @IsPositive()
  page_count: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Dimensions)
  dimensions?: Dimensions;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  cover_image_url?: string;

  @IsNumber()
  rating: number;

  @IsInt()
  number_of_reviews: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  edition?: string;

  @IsOptional()
  @IsString()
  series?: string;
}

export class CreateBookDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookItem)
  list: BookItem[];
}
