import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsUsersTable1738051253186 implements MigrationInterface {
  name = 'AddColumnsUsersTable1738051253186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_reset_token_validate_before" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_reset_token_validate_before"`,
    );
  }
}
