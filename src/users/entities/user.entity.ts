import { UserRole } from '../../constants/constants';
import { BaseEntity } from '../../common/baseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Giá trị mặc định là 'user'
  })
  role: UserRole;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  email_validated_at?: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  password_set_token?: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  password_reset_token?: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  password_reset_token_validate_before?: Date;
}
