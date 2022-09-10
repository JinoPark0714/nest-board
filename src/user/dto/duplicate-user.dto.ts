import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DuplicateUserDto {
  @ApiProperty({description : '사용자 아이디'})
  readonly userId : string;
}
