import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { BulkCreateCategoriesDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('bulk-create')
  async bulkCreate(@Body() dto: BulkCreateCategoriesDto): Promise<Category[]> {
    return this.categoriesService.CreateCategories(dto);
  }
}
