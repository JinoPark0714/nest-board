import { EntityRepository, Repository, getConnection, ReturningStatementNotSupportedError } from "typeorm";
import { User } from './entities/user.entity';
import mysql from '../util/dbconfig';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  /**
   * create user
   * @param user user infomation
   * @return apply status
   */
  async signup(userId : string, userPassword : string, userName : string, userNickname : string, userPhoneNumber : string): Promise<any> {
    const result = await getConnection().createQueryBuilder()
      .insert()
      .into(User)
      .values({
        user_id : userId,
        user_password : userPassword,
        user_name : userName,
        user_nickname : userNickname,
        user_phone_number : userPhoneNumber
      })
      .execute();
    return result;
  }


  /**
   * find nickname
   * @param userId user id
   * @param userPassword user password
   * @returns nickname (string)
   */
  async findNickname(userId : string, userPassword : string) : Promise<any> {
    const [result] = await getConnection().createQueryBuilder()
      .subQuery()
      .select(['user_nickname'])
      .from(User, 't_user')
      .where('user_id = :user_id', {user_id : userId})
      .andWhere('user_password = :user_password', {user_password : userPassword})
      .execute();
    return result;
  }


  /**
   * update user
   * @param userName : user name
   * @param userPhoneNumber : user phone number
   * @param userNickname : user nickname
   * @returns
   */
  async updateUser(
    userName: string,
    userPhoneNumber : string,
    userNickname : string) :Promise<any> {
    const result = await getConnection().createQueryBuilder()
    .update(User)
    .set({
      user_name : userName,
      user_phone_number : userPhoneNumber
    })
    .where('user_nickname = :user_nickname', {user_nickname : userNickname})
    .execute();
    return result;
  }

  /**
   * delete user
   * @param userNickname user nickname
   */
  async deleteUser(userNickname : string) : Promise<any> {
    const result = await getConnection().createQueryBuilder()
    .delete()
    .from(User)
    .where('user_nickname = :user_nickname', {user_nickname : userNickname})
    .execute();
    return result;
  }
} 