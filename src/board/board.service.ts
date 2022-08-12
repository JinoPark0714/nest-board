import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './board.repository';


@Injectable()
export class BoardService {
  constructor(private readonly boardRepository : BoardRepository){}

  async createPost(createBoardDto: CreateBoardDto) {
    const {user_id, board_title, board_text, board_date} = createBoardDto;
    const result = await this.boardRepository.createPost(user_id, board_title, board_text, board_date);
    const {affectedRows} = result;
    return this.isSuccess(affectedRows);;
  }

  async updatePost(updateBoardDto : UpdateBoardDto){
    const {user_id, board_title, board_text, board_date} = updateBoardDto;
    const result = await this.boardRepository.updatePost(user_id, board_title, board_text, board_date);
    const {affectedRows} = result;
    return this.isSuccess(affectedRows);
  }

  getBoard(){

  }


  isSuccess(affectedRows : number){
    if(affectedRows == 1)
      return true;
    return false;
  }
}
