import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order_detail.entity';
import { In, Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    public readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    public readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Book)
    public readonly bookRepository: Repository<Book>,
  ) {}
  async create(order: CreateOrderDto) {
    try {
      // Is order have at least 1 book
      if (!order.detail || order.detail.length === 0) {
        throw new BadRequestException('Order must contain at least one book');
      }

      // Get book's id list from order detail
      const bookIds = order.detail.map((item) => item.bookId);

      // Check if book exist or not
      const books = await this.bookRepository.find({
        where: { id: In(bookIds) },
      });

      if (books.length !== bookIds.length) {
        throw new BadRequestException('Some books do not exist');
      }

      // Check book quantity and calculate total price
      let total_price = 0;
      const updatedBooks = books.map((book) => {
        const item = order.detail.find((i) => i.bookId === book.id);
        if (!item) return book;

        if (item.quantity > book.stock_quantity) {
          throw new BadRequestException(
            `Book ID ${book.id} only has ${book.stock_quantity} left`,
          );
        }

        total_price += book.price * item.quantity; // Tính tổng tiền
        book.stock_quantity -= item.quantity; // Giảm tồn kho
        return book;
      });
      // 🔹 Tạo Order
      const newOrder = this.orderRepository.create({
        userId: order.userId || undefined,
        status: order.status,
        payment_method: order.payment_method,
        shipping_address: order.shipping_address,
        phone_number: order.phone_number,
        note: order.note,
        total_price,
      });

      const savedOrder = await this.orderRepository.save(newOrder);

      // 🔹 Lưu OrderDetail với orderId
      const orderDetails = order.detail.map((item) => ({
        orderId: savedOrder.id,
        bookId: item.bookId,
        quantity: item.quantity,
        sub_total: item.sub_total,
      }));

      await this.orderDetailRepository.insert(orderDetails);
      // update book's stock quantity
      await this.bookRepository.save(updatedBooks);

      return savedOrder.id;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const err = error as Error;
      throw new BadRequestException(err.message || 'Create order failed');
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
