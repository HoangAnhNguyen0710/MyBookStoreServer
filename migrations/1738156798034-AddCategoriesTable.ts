import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoriesTable1738156798034 implements MigrationInterface {
  name = 'AddCategoriesTable1738156798034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "category" TO "categoryId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "books" ADD "categoryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_a0f13454de3df36e337e01dbd55" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_a0f13454de3df36e337e01dbd55"`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD "categoryId" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(
      `ALTER TABLE "books" RENAME COLUMN "categoryId" TO "category"`,
    );
  }
}
