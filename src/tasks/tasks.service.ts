import { ConflictException, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTask, UpdateTaskStatus } from 'src/tasks/dto';
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

  createTask(createTaskDto: CreateTask): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus({
    id,
    status,
    currentUser,
  }: UpdateTaskStatus): Promise<Task> {
    const task = await this.tasksRepository.getTask(id);

    if (task.createdById !== currentUser.id) {
      throw new ConflictException(
        'You don`t have permission to update this task',
      );
    }

    return this.tasksRepository.updateTaskStatus({ id, status });
  }
}
