import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly user_id : string;
  readonly user_password : string;
  readonly user_name : string;
  readonly user_nickname : string;
  readonly user_phone_number : string;
}


export class DeleteUserDto {
  readonly user_id : string;
}

export class SigninUserDto {
  readonly user_id : string;
  readonly user_password : string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
