import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/baseEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetail } from './order_detail.entity';
import { OrderStatus, PaymentMethod } from '../../constants/constants';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.BANK_TRANSFER,
  })
  payment_method: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'text' })
  shipping_address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.order, {
    cascade: true,
  })
  items: OrderDetail[];
}
