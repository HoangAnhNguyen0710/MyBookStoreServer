import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1737897709333 implements MigrationInterface {
  name = 'AddUsersTable1737897709333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('SELLER', 'USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(12) NULLABLE, "avatar_url" character varying(255) NULLABLE, "password" character varying(255) NULLABLE, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "email_validated_at" TIMESTAMP WITH TIME ZONE, "password_set_token" character varying, "password_reset_token" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
