import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('board')
@ApiTags('Board API')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly authService: AuthService) {}

  // 게시글 쓰기
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `post Board API`, description: `Post Board` })
  createPost(@Req() request: Request, @Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createPost(createBoardDto);
  }

  // 게시글 수정 => 게시글 정보를 가져온 상태에서 수정
  @Put()
  @ApiOperation({ summary: ``, description: `` })
  updatePost(@Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updatePost(updateBoardDto);
  }

  // 게시글 조회
  @Get()
  @ApiOperation({ summary: ``, description: `` })
  getBoards(@Param() id: string) {

  }

  @Post()
  deletePost(){
    
  }
}
