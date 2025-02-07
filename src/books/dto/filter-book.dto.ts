import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsInt,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class BookListItem {
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
  number_of_reviews: number;

  @ApiProperty({ required: false })
  @Expose()
  tags?: string[];
}

export class BookFilterResponseDto {
  @ApiProperty({ required: false })
  total?: number;

  @ApiProperty({ required: false })
  list?: BookListItem[];
}

export class BookFilter {
  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  author?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  publisher_ids?: number[];

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  category_ids?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rating_from?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  rating_to?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price_from?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price_to?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(String) : [String(value)],
  )
  tags?: string[];
}

export class BookFilterDto extends BookFilter {
  @ApiProperty({ required: false })
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  per_page: number;
}
