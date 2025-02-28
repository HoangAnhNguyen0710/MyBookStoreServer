import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { BulkCreateCategoriesDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { ListingCategoriesResponseDto } from './dto/listing-category.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@ApiExtraModels(ListingCategoriesResponseDto)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('bulk-create')
  async bulkCreate(@Body() dto: BulkCreateCategoriesDto): Promise<Category[]> {
    return this.categoriesService.CreateCategories(dto);
  }

  @Get()
  async getAll(): Promise<ListingCategoriesResponseDto> {
    return this.categoriesService.ListingCategories();
  }
}
