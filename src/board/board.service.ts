import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository
  ) { }

  async createPost(createBoardDto: CreateBoardDto, userId: any): Promise<any> {
    try {
      const { boardTitle, boardText, boardDate } = createBoardDto;
      const result = await this.boardRepository.createPost(userId, boardTitle, boardText, boardDate);
      if(result)
        return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
    
  }

  async updatePost(updateBoardDto: UpdateBoardDto, user_id: string): Promise<any> {
    return 'e';
  }

  /**
   * 게시글 모두 가져오기
     * @returns 
   */
  async getAllPost(): Promise<any> {
    try {
      const result = await this.boardRepository.getAllPost();
      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }


}
