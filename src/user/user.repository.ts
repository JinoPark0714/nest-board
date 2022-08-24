import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from './entities/user.entity';
import mysql from '../util/dbconfig';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  // 회원 가입 (유저 생성)
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
      const { affectedRows } = JSON.parse(JSON.stringify(result));
      mysqlConnection.release();
      return affectedRows;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }

  // 로그인
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

  // 회원 정보 수정
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
          user_id = ?
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

  // 회원 탈퇴 (유저 삭제)
  async deleteUser(user_id: string): Promise<any> {
    try {
      const mysqlConnection = await mysql.getConnection();
      const query = `
        DELETE
        FROM t_user
        WHERE user_id = ?
      `;
      const [result] = await mysqlConnection.query(query, [user_id]);
      mysqlConnection.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }


}