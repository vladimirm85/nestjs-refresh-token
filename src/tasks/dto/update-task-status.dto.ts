import { IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStatusDto {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
