import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
// import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListingPublisherResponseDto } from './dto/listing-publisher.dto';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  @ApiOperation({ summary: 'Add a publisher' })
  @ApiResponse({ status: 201, description: 'Response id of created publisher' })
  @ApiResponse({ status: 400, description: 'Publisher is already exist' })
  async create(@Body() createPublisherDto: CreatePublisherDto) {
    return await this.publishersService.create(createPublisherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of publishers' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'per_page', required: false, example: 10 })
  @ApiResponse({ status: 200, type: ListingPublisherResponseDto })
  async listingPublishers(
    @Query('page') page: number = 1,
    @Query('per_page') per_page: number = 10,
  ): Promise<ListingPublisherResponseDto> {
    return await this.publishersService.listingPublishers(+page, +per_page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePublisherDto: UpdatePublisherDto,
  // ) {
  //   return this.publishersService.update(+id, updatePublisherDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(+id);
  }
}
