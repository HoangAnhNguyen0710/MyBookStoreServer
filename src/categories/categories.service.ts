import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkCreateCategoriesDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async CreateCategories(dto: BulkCreateCategoriesDto): Promise<Category[]> {
    const categoryNames = dto.categories.map((cat) => cat.name.toLowerCase());

    // Kiểm tra trùng lặp trong danh sách đầu vào
    const uniqueNames = new Set(categoryNames);
    if (uniqueNames.size !== categoryNames.length) {
      throw new ConflictException('Duplicate categories in request');
    }

    // Kiểm tra xem category đã tồn tại chưa
    const existingCategories = await this.categoryRepository.find({
      where: categoryNames.map((name) => ({ name })),
    });

    const existingNames = new Set(
      existingCategories.map((cat) => cat.name.toLowerCase()),
    );

    const newCategories = dto.categories
      .filter((cat) => !existingNames.has(cat.name.toLowerCase()))
      .map((cat) => this.categoryRepository.create({ name: cat.name }));

    if (newCategories.length === 0) {
      throw new ConflictException('All categories already exist');
    }

    return this.categoryRepository.save(newCategories, { chunk: 100 });
  }
}
