import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTablesColumnName1738157883756 implements MigrationInterface {
  name = 'ChangeTablesColumnName1738157883756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Đổi tên cột từ camelCase sang snake_case
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "publicationDate" TO "publication_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "stockQuantity" TO "stock_quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "pageCount" TO "page_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "coverImageUrl" TO "cover_image_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "numberOfReviews" TO "number_of_reviews"`,
    );

    // Xóa và thêm lại các trường created_at, updated_at (đã chuẩn hóa tên)
    await queryRunner.query(`ALTER TABLE "publishers" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "publishers" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "publishers" RENAME COLUMN "contactEmail" TO "contact_email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" RENAME COLUMN "phoneNumber" TO "phone_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );

    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "categories" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );

    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Đổi lại tên cột về camelCase
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "publication_date" TO "publicationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "stock_quantity" TO "stockQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "page_count" TO "pageCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "cover_image_url" TO "coverImageUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "number_of_reviews" TO "numberOfReviews"`,
    );

    // Xóa và thêm lại các trường createdAt, updatedAt (khôi phục lại như ban đầu)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "created_at"`,
    );

    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "publishers" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "publishers" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
