import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { TokensRepository } from './tokens.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from 'src/auth/auth.resolver';
import { config } from 'dotenv';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
config();

@Module({
  imports: [
    TypeOrmModule.forFeature([TokensRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_TTL,
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
