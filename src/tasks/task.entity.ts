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
import { User } from 'src/auth/user.entity';

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

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatus.OPEN,
  })
  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  createdById: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy: User;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
