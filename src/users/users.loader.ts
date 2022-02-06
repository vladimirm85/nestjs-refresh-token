import { UsersService } from './users.service';
import { User } from './users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersLoader {
  constructor(private readonly usersService: UsersService) {}

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const users = await this.usersService.getUsersByIds(ids);

    const usersMap = users.reduce(
      (acc, user) => ({
        ...acc,
        [user.id]: user,
      }),
      {} as Record<string, User>,
    );

    return ids.map((id) => usersMap[id]);
  }
}
