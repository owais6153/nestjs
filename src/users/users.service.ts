import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private users: UserType[] = [];

  fetchUsers(): UserType[] {
    return this.users;
  }
  createUser(user: UserDTO): UserType[] {
    this.users.push({ ...user, id: Math.floor(Math.random() * 1000) + 1 });
    return this.users;
  }
  getUserByUsername(id: number): UserType[] {
    return this.users.filter((user) => user.id === id);
  }
}
