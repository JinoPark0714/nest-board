import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('Board API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글 쓰기
  @Post()
  @ApiOperation({ summary : `post Board API`, description : `Post Board`})
  createPost(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createPost(createBoardDto);
  }

  // 게시글 수정 => 게시글 정보를 가져온 상태에서 수정
  @Put()
  @ApiOperation({ summary : ``, description : ``})
  updatePost(@Body() updateBoardDto : UpdateBoardDto){
    return this.boardService.updatePost(updateBoardDto);
  }

  // 게시글 조회
  @Get()
  @ApiOperation({ summary : ``, description : ``})
  getBoards(@Param() id : string){

  }
}
