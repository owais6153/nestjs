import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/users/service/user/user.service';
import { UserType } from 'src/utils/types';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): UserType[] {
    return this.userService.getAllUsers();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: UserDto): UserType[] {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserByID(@Param('id') id: string): UserType[] {
    const user = this.userService.getById(id);
    if (user.length === 0)
      throw new HttpException('No user found!', HttpStatus.NOT_FOUND);

    return user;
  }

  @Delete(':id')
  deleteUserByID(@Param('id') id: string): UserType[] {
    return this.userService.deleteUserById(id);
  }

  @Put(':id/update')
  @UsePipes(new ValidationPipe())
  updateUserByID(@Param('id') id: string, @Body() user: UserDto): UserType[] {
    return this.userService.updateUserById(id, user);
  }
}
