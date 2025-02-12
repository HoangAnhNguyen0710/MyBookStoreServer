import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import {
  BookFilterDto,
  BookFilterResponseDto,
  BookListItem,
} from './dto/filter-book.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'upload book(s) to server' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 201,
    description: 'response list of saved books',
  })
  create(@Body() CreateBookDto: CreateBookDto) {
    return this.booksService.create(CreateBookDto.list);
  }

  @Get('')
  @ApiOperation({ summary: 'filter books by conditions' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'response list of books filter by conditions',
  })
  async listingBooks(
    @Query() filterDto: BookFilterDto,
  ): Promise<BookFilterResponseDto> {
    return await this.booksService.listingBooks(filterDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'get a book by id' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'response book with id',
  })
  async findOne(@Param('id') id: string): Promise<GetBookResponseDto> {
    return await this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a book by id' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'return true if book successful updated',
  })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    await this.booksService.update(+id, updateBookDto);
    return true;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
