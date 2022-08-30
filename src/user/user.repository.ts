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
  async signup(user: User): Promise<any> {
    const result = await getConnection().createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
    return result;
  }


  /**
   * find nickname
   * @param user_id user id
   * @param user_password user password
   * @returns nickname (string)
   */
  async findNickname(user_id : string, user_password : string) : Promise<any> {
    const [result] = await getConnection().createQueryBuilder()
      .subQuery()
      .select(['user_nickname'])
      .from(User, 't_user')
      .where('user_id = :user_id', {user_id : user_id})
      .andWhere('user_password = :user_password', {user_password : user_password})
      .execute();
    return result;
  }


  /**
   * 회원 정보 수정
   * @param userInfo 수정할 회원 정보 
   * @returns 데이터베이스 반영 유무
   */
  async updateUser(userInfo: Array<any>) :Promise<any> {
    try {
      const mysqlConnection = await mysql.getConnection();
      const query = `
        UPDATE t_user
        SET 
          user_name = ?,
          user_nickname = ?,
          user_phone_number = ?
        WHERE
          user_nickname = ?
      `;
      const [result] = await mysqlConnection.query(query, userInfo);
      mysqlConnection.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      console.log(message, code, errno);
      return { message, code, errno };
    }
  }

  /**
   * 유저 삭제
   * @param user_nickname 닉네임 
   * @returns 데이터베이스 반영 유무
   */
  async deleteUser(user_nickname: string): Promise<any> {
    try {
      const mysqlConnection = await mysql.getConnection();
      const query = `
        DELETE
        FROM t_user
        WHERE user_nickname = ?
      `;
      const [result] = await mysqlConnection.query(query, [user_nickname]);
      mysqlConnection.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }


}