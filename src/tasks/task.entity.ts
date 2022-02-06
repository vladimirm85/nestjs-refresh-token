import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from 'src/users';

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
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatus.OPEN,
  })
  @Field(() => TaskStatus)
  status: TaskStatus;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  createdById: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy: User;

  @UpdateDateColumn()
  updatedDate: Date;
}
