import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../common/baseEntity';
import { Publisher } from '../../publishers/entities/publisher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum Language {
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  ITALIAN = 'Italian',
  RUSSIAN = 'Russian',
  HINDI = 'Hindi',
  ARABIC = 'Arabic',
  // Add more languages as needed
}

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', length: 13, unique: true })
  isbn: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  @JoinColumn({ name: 'publisherId' })
  publisher: Publisher;

  @Column({ type: 'int', nullable: true }) // Explicitly define the foreign key column
  publisherId: number;

  @Column({ type: 'date', nullable: true })
  publication_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({
    type: 'enum',
    enum: Language, // Refer to the Language enum
    enumName: 'language_enum', // Specify the enum name in PostgreSQL
  })
  language: Language;

  @Column({ type: 'int' })
  page_count: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  format?: string;

  @Column({ type: 'jsonb', nullable: true }) // Use JSONB for PostgreSQL
  dimensions?: {
    height: string;
    width: string;
    thickness: string;
  };

  @Column({ type: 'varchar', length: 50, nullable: true })
  weight?: string;

  @Column({ type: 'text', nullable: true })
  cover_image_url?: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  number_of_reviews: number;

  @Column({ type: 'text', array: true, nullable: true }) // Use PostgreSQL array type for tags
  tags?: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  edition?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  series?: string;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'int', nullable: true }) // Explicitly define the foreign key column
  categoryId: number;
}
