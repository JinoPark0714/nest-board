import { EntityRepository, Repository, getConnection, ReturningStatementNotSupportedError } from "typeorm";
import { User } from './entities/user.entity';
import mysql from '../util/dbconfig';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  /**
   * 유저 생성
   * @param userInfo 회원 가입 정보
   * @returns 데이터베이스 반영 유무
   */
  async signup(userInfo: any): Promise<any> {
    try {
      const mysqlConnection = await mysql.getConnection();
      const query = `
        INSERT INTO t_user(
          user_id,
          user_password,
          user_name,
          user_nickname,
          user_phone_number
        )VALUES(
          ?, ?, ?, ?, ?
        );
      `;
      const [result] = await mysqlConnection.query(query, [
        userInfo.user_id,
        userInfo.user_password,
        userInfo.user_name,
        userInfo.user_nickname,
        userInfo.user_phone_number
      ]);
      mysqlConnection.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }

  /**
   * 로그인
   * @param user_id 아이디
   * @param user_password 패스워드
   * @returns 유저 정보
   */
  async signinORM(user_id: string, user_password: string): Promise<any> {
    const [result] = await getConnection().createQueryBuilder()
      .subQuery()
      .select(['user_name, user_nickname, user_phone_number'])
      .from(User, 't_user')
      .where('user_id = :user_id', { user_id: user_id })
      .andWhere('user_password = :user_password', { user_password: user_password })
      .execute();
    return result;
  }

  /**
   * 로그인
   * @param user_id 아이디
   * @param user_password 패스워드
   * @returns 닉네임
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