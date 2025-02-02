import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateNewUserDto } from '../../users/dto/update-user.dto';

export class SignUpFirstStepDto extends CreateUserDto {}

export class SignUpSecondStepDto extends UpdateNewUserDto {}
