import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
