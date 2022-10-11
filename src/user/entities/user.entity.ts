import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  user_id : string;

  @Column()
  user_password : string;

  @Column({length:30})
  user_name : string;

  @Column()
  user_nickname : string;

  @Column()
  user_phone_number : string;

  @Column()
  uuid : string;
}


export const usersAliasName = 'users';