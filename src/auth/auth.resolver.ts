import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthenticationData,
  LoginCredentialDto,
  RefreshTokenDto,
  RegisterCredentialDto,
} from './dto';
import { JWTGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users';
import { UsersService } from 'src/users/users.service';

const EXPIRES_IN = 60 * 60 * 24 * 30;

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthenticationData)
  async signUp(
    @Args('signUpData') registerCredentialDto: RegisterCredentialDto,
  ): Promise<AuthenticationData> {
    const user = await this.usersService.signUp(
      registerCredentialDto,
    );

    const token = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user,
      EXPIRES_IN,
    );

    return AuthResolver.buildResponsePayload(user, token, refresh);
  }

  @Mutation(() => AuthenticationData)
  async signIn(
    @Args('signInData') { username, password }: LoginCredentialDto,
  ): Promise<AuthenticationData> {
    const user = await this.usersService.getUserByUsername(username);

    const valid = user
      ? await this.usersService.validateCredentials(user, password)
      : false;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user,
      EXPIRES_IN,
    );

    return AuthResolver.buildResponsePayload(user, token, refresh);
  }

  @Mutation(() => AuthenticationData)
  async refresh(
    @Args('refreshData') { refreshToken }: RefreshTokenDto,
  ): Promise<AuthenticationData> {
    const { user, token } =
      await this.authService.createAccessTokenFromRefreshToken(
        refreshToken,
      );

    return AuthResolver.buildResponsePayload(user, token);
  }

  @Query(() => User)
  @UseGuards(JWTGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  private static buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationData {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refreshToken } : null),
      },
    };
  }
}
