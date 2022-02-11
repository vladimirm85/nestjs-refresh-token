import {
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { TokensRepository } from './tokens.repository';
import { Token } from './tokens.entity';
import { User } from 'src/users';
import { UsersService } from 'src/users/users.service';

export interface UserWithToken {
  token: Token;
  user: User;
}

export interface UserWithTokenString {
  token: string;
  user: User;
}

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const options: SignOptions = {
      subject: String(user.id),
    };

    return this.jwt.signAsync({}, options);
  }

  async generateRefreshToken(
    user: User,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.tokensRepository.createRefreshToken(
      user,
      expiresIn,
    );

    const options: SignOptions = {
      expiresIn,
      subject: user.id,
      jwtid: token.id,
    };

    return this.jwt.signAsync({}, options);
  }

  async resolveRefreshToken(encoded: string): Promise<UserWithToken> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(
      payload,
    );

    if (!token) {
      throw new UnprocessableEntityException(
        'Refresh token not found',
      );
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException(
        'Refresh token malformed',
      );
    }

    return { user, token };
  }

  async createAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<UserWithTokenString> {
    const { user } = await this.resolveRefreshToken(refreshToken);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  private async decodeRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(refreshToken);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException(
          'Refresh token expired',
        );
      } else {
        throw new UnprocessableEntityException(
          'Refresh token malformed',
        );
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException(
        'Refresh token malformed',
      );
    }

    return this.usersService.getUser(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<Token | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException(
        'Refresh token malformed',
      );
    }

    return this.tokensRepository.getRefreshToken(tokenId);
  }
}
