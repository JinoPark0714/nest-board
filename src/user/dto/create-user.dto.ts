import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty({description : '사용자 아이디'})
  @Expose({name : 'user_id'})
  readonly userId : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 비밀번호'})
  @Expose({name : 'user_password'})
  readonly userPassword : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 명'})
  @Expose({name : 'user_name'})
  readonly userName : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 닉네임'})
  @Expose({name : 'user_nickname'})
  readonly userNickname : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 전화번호'})
  @Expose({name : 'user_phone_number'})
  readonly userPhoneNumber : string;
}
