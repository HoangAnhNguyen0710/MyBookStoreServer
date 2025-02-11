import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UpdateNewUserDto, UpdateUserDto } from './dto/update-user.dto';
// import * as QRCode from 'qrcode';

@ApiTags('User')
@ApiExtraModels(CreateUserDto, UpdateNewUserDto, UpdateUserDto) // Thêm tất cả DTO vào OpenAPI
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // @Post('generate')
  // async generateQRCode(
  //   @Body() data: { name: string; email: string; number: string },
  // ) {
  //   try {
  //     // Tạo URL chứa query parameters
  //     const baseUrl = 'http://localhost:3000';
  //     const queryParams = new URLSearchParams({
  //       name: data.name,
  //       email: data.email,
  //       number: data.number,
  //     }).toString();

  //     const qrUrl = `${baseUrl}?${queryParams}`;

  //     // Chuyển URL thành mã QR
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //     const qrCode = await QRCode.toDataURL(qrUrl);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     return { qrCode };
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     throw new Error('Error generating QR Code');
  //   }
  // }
}
