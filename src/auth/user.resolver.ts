import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}
}
