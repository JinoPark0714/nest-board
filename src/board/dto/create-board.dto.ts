import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBoardDto {

  @ApiProperty({description : `게시글 제목`})
  readonly board_title : string;

  @ApiProperty({description : `게시글 내용`})
  readonly board_text : string;

  @ApiProperty({description : `게시글 작성일`})
  readonly board_date : string;
}
