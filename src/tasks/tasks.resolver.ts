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
import {
  CreateTask,
  CreateTaskDto,
  UpdateTaskStatus,
  UpdateTaskStatusDto,
} from './dto';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { User } from 'src/users';
import { DataLoaders } from 'src/dataloader/dataloader.service';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TasksService) {}

  @Mutation(() => Task)
  @UseGuards(JWTGuard)
  async createTask(
    @CurrentUser() currentUser: User,
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const taskData: CreateTask = {
      ...createTaskDto,
      createdBy: currentUser,
    };
    return await this.taskService.createTask(taskData);
  }

  @Mutation(() => Task)
  @UseGuards(JWTGuard)
  async updateTaskStatus(
    @CurrentUser() currentUser: User,
    @Args('updateTaskStatusDto')
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const taskData: UpdateTaskStatus = {
      ...updateTaskStatusDto,
      currentUser,
    };

    return await this.taskService.updateTaskStatus(taskData);
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
