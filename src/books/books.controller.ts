import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
// import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import {
  BookFilterDto,
  BookFilterResponseDto,
  BookListItem,
} from './dto/filter-book.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@ApiExtraModels(BookFilterDto, BookListItem, BookFilterResponseDto)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() CreateBookDto: CreateBookDto) {
    return this.booksService.create(CreateBookDto.list);
  }

  // @Get()
  // findAll() {
  //   return this.booksService.findAll();
  // }

  @Get('')
  async listing_books(
    @Query() filterDto: BookFilterDto,
  ): Promise<BookFilterResponseDto> {
    return await this.booksService.listing_books(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(+id, updateBookDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
