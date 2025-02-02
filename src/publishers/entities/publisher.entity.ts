import { BaseEntity } from '../../common/baseEntity';
import { Book } from '../../books/entities/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('publishers')
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_email?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}
