import { Query, Resolver } from '@nestjs/graphql';

import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query(() => [Task])
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
}
