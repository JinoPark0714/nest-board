import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DeleteBoardDto {
  @ApiProperty({description : `사용자 아이디`})
  readonly user_id : string;

  @ApiProperty({description : `게시글 번호`})
  readonly board_id : number;
}
