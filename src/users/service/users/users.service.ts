import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserPostType,
  CreateUserProfileType,
  CreateUserType,
  UpdateUserType,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({
      relations: ['profile'],
    });
  }

  createUser(user: CreateUserType) {
    const newUser = this.userRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, user: UpdateUserType) {
    await this.userRepository.update({ id }, { ...user });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete({ id });
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUserProfile(id: number, profile: CreateUserProfileType) {
    const user = await this.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newProfile = this.profileRepository.create(profile);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, post: CreateUserPostType) {
    const user = await this.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newPost = this.postRepository.create({ ...post, user });
    return this.postRepository.save(newPost);
  }
}
