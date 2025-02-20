import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { OrderStatus, PaymentMethod } from '../../constants/constants';

export class UpdateOrderDto {
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod' })
  @IsOptional()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ example: 'Ship me after woking hour', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ example: '123 ABC street' })
  @IsOptional()
  @IsString()
  shipping_address: string;

  @ApiProperty({ example: '+123345454553' })
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;
}
