import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CategoryItem {
  @ApiProperty({ example: 1, description: 'Category Id' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'historical', description: 'Category name' })
  @Expose()
  name: string;
}

export class ListingCategoriesResponseDto {
  @ApiProperty({ type: [CategoryItem] })
  @Type(() => CategoryItem)
  list: CategoryItem[];
}
