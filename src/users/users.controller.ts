import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';
import { UserType } from 'src/utils/types';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @HttpCode(200)
  @Get()
  getUsers(): UserType[] {
    return this.service.fetchUsers();
  }

  @HttpCode(201)
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: UserDTO): UserType[] {
    return this.service.createUser(user);
  }

  @HttpCode(200)
  @Get(':id')
  getUserByUsername(@Param('id', ParseIntPipe) id: number): UserType[] {
    const user = this.service.getUserByUsername(id);
    if (user?.length === 0)
      throw new HttpException(
        `User not found for id ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }
}
