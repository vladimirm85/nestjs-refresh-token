import { Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthCredentialDto {
  @Field()
  @Length(4, 8)
  username: string;

  @Field()
  @Length(8, 16)
  password: string;
}
