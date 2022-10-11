import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateBoardDto {

  @ApiProperty({description : `게시글 제목`})
  @Expose({name : 'board_title'})
  readonly boardTitle : string;

  @ApiProperty({description : `게시글 내용`})
  @Expose({name : 'board_text'})
  readonly boardText : string;

  @ApiProperty({description : `게시글 작성일`})
  @Expose({name : 'board_date'})
  readonly boardDate : string;
}
