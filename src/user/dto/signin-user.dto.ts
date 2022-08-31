import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SigninUserDto {
  @ApiProperty({description : '사용자 아이디', example : "jino"})
  readonly userId : string;

  @ApiProperty({description : '사용자 비밀번호', example : "jino"})
  readonly userPassword : string; 
}
