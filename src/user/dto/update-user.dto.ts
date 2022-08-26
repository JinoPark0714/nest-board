import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({description : `사용자 명`})
  readonly user_name : string;

  @ApiProperty({description : `사용자 전화번호`})
  readonly user_phone_number : string;
}
