import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BulkCreateCategoriesDto {
  @IsArray()
  @IsNotEmpty({ message: 'List of categories cannot be empty' })
  categories: CreateCategoryDto[];
}
