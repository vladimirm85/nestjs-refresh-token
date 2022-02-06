import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { hashSync } from 'bcryptjs';
import { AuthCredentialDto } from 'src/auth/dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({
    username,
    password,
  }: AuthCredentialDto): Promise<void> {
    await this.save({ username, password: hashSync(password) });
  }

  async getUser(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return await this.findByIds(ids);
  }
}
