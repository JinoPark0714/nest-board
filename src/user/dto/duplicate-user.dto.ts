import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DuplicateUserDto {
  @ApiProperty({description : '사용자 아이디'})
  @Expose({name : 'user_id'})
  readonly userId : string;
}
