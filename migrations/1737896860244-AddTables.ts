import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTables1737896860244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create publishers table
    await queryRunner.createTable(
      new Table({
        name: 'publishers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'website',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'contactEmail',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create books table
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'author',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'isbn',
            type: 'varchar',
            length: '13',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'publisherId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'publicationDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'stockQuantity',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'language',
            type: 'enum',
            enum: [
              'English',
              'Spanish',
              'French',
              'German',
              'Chinese',
              'Japanese',
              'Korean',
              'Italian',
              'Russian',
              'Hindi',
              'Arabic',
            ],
            enumName: 'language_enum',
            isNullable: false,
          },
          {
            name: 'pageCount',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'format',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'dimensions',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'coverImageUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'rating',
            type: 'float',
            isNullable: false,
            default: 0,
          },
          {
            name: 'numberOfReviews',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'tags',
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'edition',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'series',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create foreign key for books.publisherId -> publishers.id
    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['publisherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publishers',
        onDelete: 'SET NULL',
        name: 'FK_books_publisherId',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key
    await queryRunner.dropForeignKey('books', 'FK_books_publisherId');

    // Drop books table
    await queryRunner.dropTable('books');

    // Drop publishers table
    await queryRunner.dropTable('publishers');

    // Drop language_enum
    await queryRunner.query(`DROP TYPE language_enum`);
  }
}
