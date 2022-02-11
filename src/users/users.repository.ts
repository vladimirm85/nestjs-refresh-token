import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterCredentialDto } from 'src/auth/dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    registerCredentialDto: RegisterCredentialDto,
  ): Promise<User> {
    try {
      return await this.save(registerCredentialDto);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exist');
      }
      throw new InternalServerErrorException(e);
    }
  }

  async getUser(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.findOne({ username });
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return await this.findByIds(ids);
  }
}
