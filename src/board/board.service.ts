import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './board.repository';
import { common } from '../util/common';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository : BoardRepository){}

  async createPost(createBoardDto: CreateBoardDto, user_id : string) : Promise<any>{
    const {board_title, board_text, board_date} = createBoardDto;
    const result = await this.boardRepository.createPost(user_id, board_title, board_text, board_date);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);;
  }

  async updatePost(updateBoardDto : UpdateBoardDto, user_id : string) : Promise<any>{
    const {board_title, board_text, board_date} = updateBoardDto;
    const result = await this.boardRepository.updatePost(user_id, board_title, board_text, board_date);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);
  }

  getBoard(){

  }


}
