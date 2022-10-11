import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('increment')
  board_id : number;

  @Column()
  user_id : string;

  @Column()
  board_title : string;

  @Column()
  board_text : string;

  @Column()
  board_date : string;
}


export const boardsAliasName = 'boards';