import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column({ default: false })
  isRevoked: boolean;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  expires: Date;
}
