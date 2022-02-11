import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users';
import { Token } from './tokens.entity';

@EntityRepository(Token)
export class TokensRepository extends Repository<Token> {
  async createRefreshToken(user: User, ttl: number): Promise<Token> {
    const expires = new Date();
    expires.setTime(expires.getTime() + ttl);

    const token: Partial<Token> = {
      userId: user.id,
      expires,
    };

    return this.save(token);
  }

  async getRefreshToken(id: string): Promise<Token> {
    return this.findOne(id);
  }
}
