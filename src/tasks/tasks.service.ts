import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskStatusDto } from 'src/tasks/dto';
import { TasksRepository } from 'src/tasks/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.getAllTasks();
  }

  getTask(id: string): Promise<Task> {
    return this.tasksRepository.getTask(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(updateTaskStatusDto);
  }
}
