import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('board')
@ApiTags('Board API')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly authService: AuthService,
    private readonly userService: UserService) {}

  // 게시글 쓰기
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `post Board API`, description: `게시글 쓰기` })
  async createPost(@Body() createBoardDto: CreateBoardDto, @Headers('authorization') authorization : string) {
    /**
     * userId를 가져오기 위해 다음과 같이 작성해야 한다.
     * 1. token을 디코딩하여 uuid를 가져온다.
     * 2. uuid를 통해 userId를 가져온다.
     */
    const uuid = this.authService.getUuid(authorization);
    const {user_id} = await this.userService.getUserId(uuid);
    return this.boardService.createPost(createBoardDto, user_id);
  }

  // 게시글 수정 => 게시글 정보를 가져온 상태에서 수정
  @Put()
  @ApiOperation({ summary: ``, description: `` })
  updatePost(@Body() updateBoardDto: UpdateBoardDto, @Headers('authorization') authorization : string) {
    const {user_id} = this.authService.verifyAccessToken(authorization);
    return this.boardService.updatePost(updateBoardDto, user_id);
  }

  // 게시글 조회
  @Get()
  @ApiOperation({ summary: ``, description: `` })
  getPost(@Param() id: string) {

  }

  // 게시글 모두 가져오기
  @Get('all')
  @ApiOperation({summary : 'getAllPost Board API', description : '게시글 모두 가져오기'})
  getAllPost(){
    console.log("Board API getAllPost");
    return this.boardService.getAllPost();
  }

  @Post()
  deletePost(){
    
  }
}
