import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { config } from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

// Load biến môi trường từ file .env
config();

const pg_config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DATABASE || 'cafe_finder',
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'], // Đường dẫn chứa migration
  // synchronize: process.env.MODE === 'DEV', // Chỉ bật synchronize trong môi trường DEV
  synchronize: false,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(pg_config),
    BooksModule,
    PublishersModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth', 'users');
  }
}
