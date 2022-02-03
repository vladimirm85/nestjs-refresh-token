import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskStatusDto } from 'src/tasks/dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.save(createTaskDto);
  }

  async updateTaskStatus({
    id,
    status,
  }: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.getTask(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    task.status = status;

    return await this.save(task);
  }

  async deleteTask(id: string): Promise<boolean> {
    const res = await this.createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id })
      .execute();

    if (!res.affected) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return true;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.find();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }
}
