import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from 'src/auth/dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signUp(
    @Args('signUpData') authCredentialDto: AuthCredentialDto,
  ): Promise<boolean> {
    await this.authService.signUp(authCredentialDto);

    return true;
  }
}
