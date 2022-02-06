import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUser(
    @Args('id', {}, new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<User> {
    return await this.usersService.getUser(id);
  }
}
