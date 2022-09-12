import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UpdateUserDto {
  @ApiProperty({description : `사용자 명`})
  @Expose({name : 'user_name'})
  readonly userName : string;

  @ApiProperty({description : `사용자 닉네임`})
  @Expose({name:'user_nickname'})
  readonly userNickname : string;

  @ApiProperty({description : `사용자 전화번호`})
  @Expose({name:'user_phone_number'})
  readonly userPhoneNumber : string;
}
