import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto';
import { hashSync } from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({
    username,
    password,
  }: AuthCredentialDto): Promise<void> {
    await this.save({ username, password: hashSync(password) });
  }
}
