import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hashSync } from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { RegisterCredentialDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp({
    username,
    password,
  }: RegisterCredentialDto): Promise<User> {
    return await this.usersRepository.createUser({
      username,
      password: hashSync(password),
    });
  }

  getUser(id: string): Promise<User> {
    return this.usersRepository.getUser(id);
  }

  getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.getUserByUsername(username);
  }

  getUsersByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.getUsersByIds(ids);
  }

  async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }
}
