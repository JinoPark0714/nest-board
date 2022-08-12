import {EntityRepository, Repository} from 'typeorm';
import mysql from '../util/dbconfig';
import { Board } from './entities/board.entity';


@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{

  async createPost(
    userId : string, 
    boardTitle : string, 
    boardText : string, 
    boardDate : string
  ) : Promise<any>{
    try {
      const queryParams = [userId, boardTitle, boardText, boardDate];
      const database = await mysql.getConnection();
      const query = `
        INSERT INTO t_board(
          user_id,
          board_title,
          board_text,
          board_date
        )VALUES(
          ?, ?, ?, ?
        )
      `;
      const [result] = await database.query(query, queryParams);
      database.release();
      return result;
    } catch (error) {
      const {message, code, errno} = error;
      console.log(message, code, errno);
      return {message, code, errno};
    }
  }

  async updatePost(
    userId : string,
    boardTitle : string,
    boardText : string,
    boardDate : string
  ) : Promise<any>{
    try {
      const queryParams = [boardTitle, boardText, boardDate, userId];
      const database = await mysql.getConnection();
      const query = `
        UPDATE t_board
        SET 
          board_title = ?,
          board_text = ?,
          board_date = ?
        WHERE user_id = ?
      `;
      const [result] = await database.query(query, queryParams);
      database.release();
      return result;
    } catch (error) {
      const {message, code, errno} = error;
      console.log(message, code, errno);
      return {message, code, errno};
    }
  }

}