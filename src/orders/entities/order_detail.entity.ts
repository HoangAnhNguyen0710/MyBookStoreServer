import { BaseEntity } from '../../common/baseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('order_details')
@Unique(['order', 'book'])
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'decimal' })
  orderId: number;

  @ManyToOne(() => Book, (book) => book.id, { nullable: false })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({ type: 'decimal' })
  bookId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sub_total: number; // Fix kiểu dữ liệu tránh lỗi làm tròn số
}
