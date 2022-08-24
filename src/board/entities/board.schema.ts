import { EntitySchema } from "typeorm";
import { Board } from './board.entity';


export const BoardSchema = new EntitySchema<Board>({
  name : "Board",
  target : Board,
  columns : {
    user_id : {
      type : String,
    },
    board_id : {
      type : String,
      primary : true
    },
    board_title : {
      type : String
    },
    board_text : {
      type : String
    },
    board_date : {
      type : String
    }
  }
});
