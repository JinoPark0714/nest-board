import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 아이디', example: "jjj1234"})
  readonly userId : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 비밀번호', example : "12344"})
  readonly userPassword : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 명', example : "비둘기"})
  readonly userName : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 닉네임', example : '구구구구'})
  readonly userNickname : string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description : '사용자 전화번호', example : "010-1234-1234"})
  readonly userPhoneNumber : string;
}
