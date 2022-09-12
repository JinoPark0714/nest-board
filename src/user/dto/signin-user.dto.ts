import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SigninUserDto {
  @ApiProperty({description : '사용자 아이디'})
  @Expose({name : 'user_id'})
  readonly userId : string;

  @ApiProperty({description : '사용자 비밀번호'})
  @Expose({name : 'user_password'})
  readonly userPassword : string; 
}
