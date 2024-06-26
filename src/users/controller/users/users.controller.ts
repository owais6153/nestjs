import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/profile')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, profile);
  }

  @Post(':id/post')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, post);
  }
}
