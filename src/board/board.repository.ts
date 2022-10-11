import {EntityRepository, Repository, getConnection } from 'typeorm';
import { Board, boardsAliasName } from './entities/board.entity';


@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{

  async createPost(
    userId : string, 
    boardTitle : string, 
    boardText : string, 
    boardDate : string
  ) : Promise<any>{
    const result = await getConnection().createQueryBuilder()
      .insert()
      .into(Board, ['user_id', 'board_title', 'board_text', 'board_date'])
      .values({
        user_id : userId,
        board_title : boardTitle,
        board_text : boardText,
        board_date : boardDate
      })
      .execute();
    return result;
  }



  async getAllPost() : Promise<any> {
    const [result] = await getConnection().createQueryBuilder()
    .subQuery()
    .select(['user_id', 'board_id', 'board_title', 'board_text', 'board_date'])
    .from(Board, boardsAliasName)
    .execute();
    return result;
  }


}