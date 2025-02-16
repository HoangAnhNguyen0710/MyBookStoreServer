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

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User; // Nếu người dùng có tài khoản

  @Column({ type: 'uuid', nullable: true })
  userId?: string; // Nullable để hỗ trợ khách vãng lai

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
