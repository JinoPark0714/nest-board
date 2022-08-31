import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({description : `사용자 명`})
  readonly userName : string;

  @ApiProperty({description : `사용자 닉네임`})
  readonly userNickname : string;

  @ApiProperty({description : `사용자 전화번호`})
  readonly userPhoneNumber : string;
}
