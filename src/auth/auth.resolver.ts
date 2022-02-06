import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthCredentialDto } from './dto';
import { AuthService } from './auth.service';
import { User } from 'src/users';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signUp(
    @Args('signUpData') authCredentialDto: AuthCredentialDto,
  ): Promise<boolean> {
    await this.authService.signUp(authCredentialDto);

    return true;
  }
}
