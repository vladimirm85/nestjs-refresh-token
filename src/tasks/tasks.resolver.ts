import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskStatusDto } from "./dto";

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TasksService) {}
  @Mutation(() => Task)
  async createTask(
    @Args("createTaskDto") createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => Task)
  async updateTaskStatus(
    @Args("updateTaskStatusDto") updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(updateTaskStatusDto);
  }

  @Mutation(() => Task)
  async deleteTask(@Args("id") id: string): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }

  @Query(() => Task)
  async getTask(@Args("id") id: string): Promise<Task> {
    return await this.taskService.getTask(id);
  }

  @Query(() => [Task])
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }
}
