import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToBooksTable1739285806316 implements MigrationInterface {
  name = 'AddStatusToBooksTable1739285806316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."status_enum" AS ENUM('AVAILABLE', 'OUT_OF_STOCK', 'PRE_ORDER', 'SOLD_OUT', 'COMING_SOON', 'DISCONTINUED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD "status" "public"."status_enum" NOT NULL DEFAULT 'AVAILABLE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."status_enum"`);
  }
}
