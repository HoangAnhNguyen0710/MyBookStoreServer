import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// import { Book } from './src/books/entities/book.entity';
// import { Publisher } from './src/publishers/entities/publisher.entity';
// import { User } from './src/users/entities/user.entity';
// import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';
// import { pg_config } from './config/database';

// Load biến môi trường từ file .env
config();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
const configService = new ConfigService();

const NewDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DATABASE || 'cafe_finder',
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'], // Đường dẫn chứa migration
  synchronize: process.env.MODE === 'DEV',
});

export default NewDataSource;
