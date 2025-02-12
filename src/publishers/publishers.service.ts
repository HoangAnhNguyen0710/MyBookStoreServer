import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
// import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { Repository } from 'typeorm';
import {
  ListingPublisherResponseDto,
  PublisherItemDto,
} from './dto/listing-publisher.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    public readonly publisherRepository: Repository<Publisher>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto) {
    const { name, contact_email, website, phone_number } = createPublisherDto;
    const publisher_exist = await this.publisherRepository.findOne({
      where: [
        { name, contact_email },
        { name, website },
        { name, phone_number },
      ],
    });
    if (publisher_exist) {
      throw new BadRequestException('Publisher is already exist!');
    }
    const publisher = this.publisherRepository.create(createPublisherDto);
    return (await this.publisherRepository.save(publisher)).id;
  }

  async listingPublishers(
    page: number = 1,
    per_page: number = 10,
  ): Promise<ListingPublisherResponseDto> {
    const [publishers, total] = await this.publisherRepository.findAndCount({
      skip: (page - 1) * per_page,
      take: per_page,
      order: { created_at: 'DESC' },
    });

    return {
      page,
      per_page,
      total,
      total_pages: Math.ceil(total / per_page),
      data: plainToInstance(PublisherItemDto, publishers, {
        excludeExtraneousValues: true,
      }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  // update(id: number, updatePublisherDto: UpdatePublisherDto) {
  //   return `This action updates a #${id} publisher`;
  // }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
