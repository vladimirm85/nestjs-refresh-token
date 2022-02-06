import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
