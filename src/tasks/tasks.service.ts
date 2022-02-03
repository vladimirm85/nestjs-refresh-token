import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from 'src/tasks/dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...createTaskDto,
      status: TaskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): Task {
    const task = this.getTask(id);

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks[taskIndex].status = status;

    return this.tasks[taskIndex];
  }
}
