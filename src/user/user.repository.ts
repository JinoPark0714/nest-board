import { EntityRepository, Repository, getConnection } from "typeorm";
import { User } from './entities/user.entity';
import mysql from '../util/dbconfig';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signup(userInfo: any): Promise<any> {
    try {
      const database = await mysql.getConnection();
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
      const [result] = await database.query(query, [
        userInfo.user_id,
        userInfo.user_password,
        userInfo.user_name,
        userInfo.user_nickname,
        userInfo.user_phone_number
      ]);
      const { affectedRows } = JSON.parse(JSON.stringify(result));
      database.release();
      return affectedRows;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }


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

  async signin(user_id: string, user_password: string): Promise<any> {
    try {
      const queryParams = [user_id, user_password];
      const database = await mysql.getConnection();
      const query = `
        SELECT 
          user_name,
          user_nickname,
          user_phone_number
        FROM t_user
        WHERE user_id = ?
        AND user_password = ?
      `;
      const [result] = await database.query(query, queryParams);
      database.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }

  async deleteUser(user_id: string): Promise<any> {
    try {
      const database = await mysql.getConnection();
      const query = `
        DELETE
        FROM t_user t
        WHERE t.user_id = ?
      `;
      const result = await database.query(query, [user_id]);
      database.release();
      return result;
    } catch (error) {
      const { message, code, errno } = error;
      return { message, code, errno };
    }
  }


}