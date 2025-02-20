import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetOrderResponseDto } from './dto/get-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    description: 'Order data including user info and order details',
    type: CreateOrderDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    schema: { example: { orderId: 123 } },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data or insufficient stock',
  })
  async createOrder(@Body() order: CreateOrderDto) {
    const orderId = await this.ordersService.create(order);
    return { orderId };
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({ status: 200, type: GetOrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order basic information' })
  @ApiBody({
    description: 'Order basic data such as status, address, ..etc..',
    type: UpdateOrderDto,
  })
  @ApiResponse({
    status: 200,
    description: 'return true if order successful updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Order with id (:id) is not exist!',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    await this.ordersService.update(+id, updateOrderDto);
    return true;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
