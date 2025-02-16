import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstrainsToOrderDetailsTable1739711640201
  implements MigrationInterface
{
  name = 'AddUniqueConstrainsToOrderDetailsTable1739711640201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details" ADD CONSTRAINT "UQ_6884937a07f3061a70bbeec6158" UNIQUE ("orderId", "bookId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details" DROP CONSTRAINT "UQ_6884937a07f3061a70bbeec6158"`,
    );
  }
}
