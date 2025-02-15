import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Dimensions } from './create-book.dto';
import { Language } from '../entities/book.entity';

class PublisherDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;
}

class CategoryDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;
}

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

  @ApiProperty({ type: PublisherDto, nullable: true })
  @Expose()
  @Type(() => PublisherDto)
  publisher: PublisherDto | null;

  @ApiProperty({ type: CategoryDto, nullable: true })
  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto | null;

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
