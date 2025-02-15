import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Dimensions } from './create-book.dto';
import { Language } from '../entities/book.entity';

export class GetBookDto {}

export class GetBookResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  isbn: string;

  @ApiProperty()
  @Expose()
  publisherId: number | null;

  @ApiProperty()
  @Expose()
  categoryId: number | null;

  @ApiProperty()
  @Expose()
  language: Language;

  @ApiProperty()
  @Expose()
  page_count?: number;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => parseFloat(value as string))
  price: number;

  @ApiProperty({ required: false })
  @Expose()
  cover_image_url?: string;

  @ApiProperty()
  @Expose()
  rating: number;

  @ApiProperty()
  @Expose()
  stock_quantity: number;

  @ApiProperty()
  @Expose()
  number_of_reviews: number;

  @ApiProperty({ required: false })
  @Expose()
  tags?: string[];

  @ApiProperty({ required: false })
  @Expose()
  dimensions?: Dimensions;

  @ApiProperty()
  @Expose()
  weight?: string;

  @ApiProperty()
  @Expose()
  edition?: string;

  @ApiProperty()
  @Expose()
  series?: string;
}
