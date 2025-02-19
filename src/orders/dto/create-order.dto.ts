import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  ValidateNested,
  IsUUID,
  IsPhoneNumber,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, PaymentMethod } from '../../constants/constants';

export class OrderDetail {
  @IsOptional()
  orderId?: number | null;

  @ApiProperty({ example: 2 })
  @IsInt()
  bookId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  sub_total: number;
}

export class Order {
  @ApiProperty()
  @IsUUID()
  userId: string;

  total_price: number;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod' })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ example: 'Ship me after woking hour', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ example: '123 ABC street' })
  @IsString()
  shipping_address: string;

  @ApiProperty({ example: '+123345454553' })
  @IsPhoneNumber()
  phone_number: string;
}

export class CreateOrderDto extends Order {
  @ApiProperty({ type: [OrderDetail] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetail)
  detail: OrderDetail[];
}
