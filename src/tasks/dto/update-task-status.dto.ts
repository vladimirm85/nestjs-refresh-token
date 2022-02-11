import { IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/users';

@InputType()
export class UpdateTaskStatusDto {
  @Field()
  @IsUUID()
  readonly id: string;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}

export class UpdateTaskStatus extends UpdateTaskStatusDto {
  currentUser: User;
}
