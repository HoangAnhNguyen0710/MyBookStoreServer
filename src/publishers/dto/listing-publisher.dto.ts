import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PublisherItemDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Penguin Random House' })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'https://www.penguinrandomhouse.com',
    nullable: true,
  })
  @Expose()
  website?: string;

  @ApiProperty({ example: 'contact@publisher.com', nullable: true })
  @Expose()
  contact_email?: string;

  @ApiProperty({ example: '+84916313317', nullable: true })
  @Expose()
  phone_number?: string;

  @ApiProperty({ example: '123 Main Street, New York, USA', nullable: true })
  @Expose()
  address?: string;

  @ApiProperty({ example: 'USA', nullable: true })
  @Expose()
  country?: string;
}

export class ListingPublisherResponseDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  per_page: number;

  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 5 })
  total_pages: number;

  @ApiProperty({ type: [PublisherItemDto] })
  data: PublisherItemDto[];
}
