import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UserType } from 'src/utils/types';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  protected users: UserType[] = [];
  getAllUsers(): UserType[] {
    return this.users;
  }
  createUser(user: UserDto): UserType[] {
    this.users.push({ ...user, id: uuidv4() });
    return this.users;
  }
  getById(id: string): UserType[] {
    return this.users.filter((user) => user.id === id);
  }
  deleteUserById(id: string): UserType[] {
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
  updateUserById(id: string, user: UserDto): UserType[] {
    this.users = this.users.filter((u) => {
      if (u.id === id)
        return {
          ...user,
          id,
        };
      else return user;
    });
    return this.users;
  }
}
