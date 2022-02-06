import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { AuthResolver } from 'src/auth/auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
