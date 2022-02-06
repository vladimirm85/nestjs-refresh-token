import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { UsersLoader } from './users.loader';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService, AuthService, UsersResolver, UsersLoader],
  exports: [UsersLoader],
})
export class UsersModule {}
