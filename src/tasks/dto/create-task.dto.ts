import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

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
