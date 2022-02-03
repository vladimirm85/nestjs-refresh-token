import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;
}
