import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class DeleteBoardDto {
  @ApiProperty({description : `사용자 아이디`})
  @Expose({name : 'user_id'})
  readonly userId : string;

  @ApiProperty({description : `게시글 번호`})
  @Expose({name : 'board_id'})
  readonly boardId : number;
}
