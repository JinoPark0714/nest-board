import {Column, Entity, PrimaryColumn, Unique} from 'typeorm';

@Entity('t_board')
export class Board {
  @PrimaryColumn()
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
