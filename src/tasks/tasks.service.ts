import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { CreateTaskDto, UpdateTaskStatusDto } from "src/tasks/dto";
import { TasksRepository } from "src/tasks/tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.save(createTaskDto);
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.getTask(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    await this.tasksRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where("id = :id", { id })
      .execute();

    return task;
  }

  async updateTaskStatus({ id, status }: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.getTask(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    task.status = status;

    return await this.tasksRepository.save(task);
  }
}
