import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNewUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { ListingUserItem } from './dto/responses.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Inject repository của User
    private readonly userRepository: Repository<User>, // Khai báo biến userRepository
  ) {}

  // async create(createUserDto: CreateUserDto) {}
  async create(createUserDto: CreateUserDto) {
    const is_exist_user = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { name: createUserDto.name }],
    });
    if (is_exist_user) {
      throw new BadRequestException('Email hoặc Username đã tồn tại');
    }
    createUserDto.id = uuidv4();
    createUserDto.password_set_token = randomBytes(16).toString('hex');

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async updateNewUser(updateUser: UpdateNewUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: updateUser.id },
    });
    if (!user) {
      throw new BadRequestException('User is not exist');
    }
    if (user.password_set_token !== updateUser.password_set_token) {
      throw new BadRequestException('Token is invalidated');
    }
    updateUser.password = await bcrypt.hash(updateUser.password, 10);
    Object.assign(user, updateUser);
    user.password_set_token = null;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<ListingUserItem[]> {
    const users = await this.userRepository.find();

    return plainToInstance(ListingUserItem, users, {
      excludeExtraneousValues: true, // Only include @Expose fields
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  findOneByPasswordSetToken(token: string) {
    return this.userRepository.findOne({
      where: { password_set_token: token },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
