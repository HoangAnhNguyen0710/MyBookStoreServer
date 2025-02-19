import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OrderStatus, PaymentMethod } from '../../constants/constants';

export class OrderDetailResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  orderId: number;

  @ApiProperty({ example: 2 })
  @Expose()
  bookId: number;

  @ApiProperty({ example: 'Clean Code' })
  @Expose()
  book_title: string;

  @ApiProperty({ example: 25.0 })
  @Expose()
  book_price: number;

  @ApiProperty({ example: 2 })
  @Expose()
  quantity: number;

  @ApiProperty({ example: 50.0 })
  @Expose()
  sub_total: number;
}

export class GetOrderResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'c5f46a9b-d86b-4e5b-9473-fb7c1f3a2d18' })
  @Expose()
  userId?: string;

  @ApiProperty({ example: 100.0 })
  @Expose()
  total_price: number;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  @Expose({ toClassOnly: true })
  status: OrderStatus;

  @ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod' })
  @Expose({ toClassOnly: true })
  payment_method: PaymentMethod;

  @ApiProperty({ example: '123 ABC street' })
  @Expose()
  shipping_address: string;

  @ApiProperty({ example: '+123345454553' })
  @Expose()
  phone_number: string;

  @ApiProperty({ example: 'Please deliver after 5 PM' })
  @Expose()
  note?: string;

  @ApiProperty({ type: [OrderDetailResponseDto] })
  @Type(() => OrderDetailResponseDto)
  @Expose()
  detail: OrderDetailResponseDto[];
}
