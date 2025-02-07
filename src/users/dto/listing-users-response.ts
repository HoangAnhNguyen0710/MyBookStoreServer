import { UserRole } from '../../constants/constants';
import { Expose } from 'class-transformer';

export class ListingUserItem {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  role: UserRole;

  @Expose()
  phone_number: string;
}
