import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/users.entity';

@InputType()
export class RegisterCredentialDto {
  @Field()
  @Length(4, 8)
  readonly username: string;

  @Field()
  @Length(8, 16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  readonly password: string;
}

@InputType()
export class LoginCredentialDto {
  @Field()
  @IsNotEmpty({ message: 'A username is required' })
  readonly username: string;

  @Field()
  @IsNotEmpty({ message: 'A password is required to login' })
  readonly password: string;
}

@InputType()
export class RefreshTokenDto {
  @Field()
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refreshToken: string;
}

@ObjectType()
export class AuthenticationDataTokens {
  @Field()
  type: string;

  @Field()
  token: string;

  @Field({ nullable: true })
  refreshToken?: string;
}

@ObjectType()
export class AuthenticationData {
  @Field()
  user: User;

  @Field()
  payload: AuthenticationDataTokens;
}
