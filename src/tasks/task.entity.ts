import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const TaskStatusEnum = Object.values(TaskStatus);

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
  })
  @Field(() => TaskStatus)
  status: TaskStatus;
}
