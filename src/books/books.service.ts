import { Injectable, NotFoundException } from '@nestjs/common';
import { BookItem } from './dto/create-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  BookFilterDto,
  BookFilterResponseDto,
  BookListItem,
} from './dto/filter-book.dto';
import { GetBookResponseDto } from './dto/get-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  create(books: BookItem[]) {
    return this.bookRepository.insert(books);
  }

  findAll() {
    return `This action returns all books`;
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id: id } });
    if (!book) {
      throw new NotFoundException('book is not exist');
    }
    return plainToInstance(GetBookResponseDto, book, {
      excludeExtraneousValues: true,
    });
  }

  update(id: number) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async listing_books(
    filterDto: BookFilterDto,
  ): Promise<BookFilterResponseDto> {
    const query = this.bookRepository.createQueryBuilder('book');
    const page = filterDto.page | 1;
    const per_page = filterDto.per_page | 20;
    if (filterDto.author?.length) {
      query.andWhere('book.author = ANY(:authors)', {
        authors: filterDto.author,
      });
    }
    if (filterDto.category_ids?.length) {
      query.andWhere('book.categoryId = ANY(:categories)', {
        categories: filterDto.category_ids,
      });
    }
    if (filterDto.title) {
      query.andWhere('book.title ILIKE :title', {
        title: `%${filterDto.title}%`,
      });
    }
    if (filterDto.publisher_ids?.length) {
      query.andWhere('book.publisherId = ANY(:publisherIds)', {
        publisherIds: filterDto.publisher_ids,
      });
    }
    if (filterDto.rating_from ?? false) {
      query.andWhere('book.rating >= :rating_from', {
        rating_from: filterDto.rating_from,
      });
    }
    if (filterDto.rating_to ?? false) {
      query.andWhere('book.rating <= :rating_to', {
        rating_to: filterDto.rating_to,
      });
    }
    if (filterDto.price_from ?? false) {
      query.andWhere('book.price >= :price_from', {
        price_from: filterDto.price_from,
      });
    }
    if (filterDto.price_to ?? false) {
      query.andWhere('book.price <= :price_to', {
        price_to: filterDto.price_to,
      });
    }
    if (filterDto.tags?.length) {
      query.andWhere('book.tags && ARRAY[:...tags]', { tags: filterDto.tags });
    }

    const total = await query.getCount();

    const books = await query
      .skip((page - 1) * per_page)
      .take(per_page)
      .getMany();

    // console.log(books);

    return {
      total,
      list: books.map((book) =>
        plainToInstance(BookListItem, book, { excludeExtraneousValues: true }),
      ),
    };
  }
}
