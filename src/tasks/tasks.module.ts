import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskResolver } from './tasks.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TasksRepository} from './tasks.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([TasksRepository])
  ],
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
