import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/users';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class CreateTask extends CreateTaskDto {
  createdBy: User;
}
