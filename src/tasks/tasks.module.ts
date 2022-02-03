import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskResolver } from './tasks.resolver';

@Module({
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
