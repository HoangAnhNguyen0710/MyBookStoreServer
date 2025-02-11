import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  Put,
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
import { GetBookResponseDto } from './dto/get-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('book')
@ApiExtraModels(
  BookFilterDto,
  BookListItem,
  BookFilterResponseDto,
  CreateBookDto,
)
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

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<GetBookResponseDto> {
    return await this.booksService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    await this.booksService.update(+id, updateBookDto);
    return true;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
