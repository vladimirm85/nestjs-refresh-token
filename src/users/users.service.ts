import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  getUser(id: string): Promise<User> {
    return this.usersRepository.getUser(id);
  }

  getUsersByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.getUsersByIds(ids);
  }
}
