import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { BaseEntity } from '../../common/baseEntity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
