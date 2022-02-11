import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { User } from 'src/users';
import { DataLoaders } from 'src/dataloader/dataloader.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TasksService) {}

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => Task)
  async updateTaskStatus(
    @Args('updateTaskStatusDto')
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(
      updateTaskStatusDto,
    );
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Args('id', {}, new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<boolean> {
    return await this.taskService.deleteTask(id);
  }

  @Query(() => Task)
  async getTask(
    @Args('id', {}, new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Task> {
    return await this.taskService.getTask(id);
  }

  @Query(() => [Task])
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @ResolveField('createdBy', () => User)
  getCreatedBy(
    @Parent() { createdById }: Task,
    @Context('dataloader') dataloader: DataLoaders,
  ): Promise<User> {
    return dataloader.usersLoader.load(createdById);
  }
}
