import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({description : '사용자 아이디', example: "jjj1234"})
  readonly user_id : string;

  @ApiProperty({description : '사용자 비밀번호', example : "12344"})
  readonly user_password : string;

  @ApiProperty({description : '사용자 명', example : "비둘기"})
  readonly user_name : string;

  @ApiProperty({description : '사용자 닉네임', example : '구구구구'})
  readonly user_nickname : string;

  @ApiProperty({description : '사용자 전화번호', example : "010-1234-1234"})
  readonly user_phone_number : string;
}
