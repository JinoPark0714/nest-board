import { EntityRepository, Repository, getConnection, ReturningStatementNotSupportedError } from "typeorm";
import { User } from './entities/user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  /**
   * create user
   * @param user user infomation
   * @return apply status
   */
  async signup(
    userId : string, 
    userPassword : string, 
    userName : string, 
    userNickname : string, 
    userPhoneNumber : string, 
    uuid : string) {
    const result = await getConnection().createQueryBuilder()
      .insert()
      .into(User)
      .values({
        user_id : userId,
        user_password : userPassword,
        user_name : userName,
        user_nickname : userNickname,
        user_phone_number : userPhoneNumber,
        uuid : uuid
      })
      .execute();
    return result;
  }

  /**
   * find user id
   * @param userId 
   * @returns {string}
   */
  async findUserId(userId : string) {
    const [result] = await getConnection().createQueryBuilder()
    .subQuery()
    .select(['user_id'])
    .from(User, 't_user')
    .where('user_id = :user_id', {user_id : userId})
    .execute();
    return result;
  }

  async findUserIdToUuid(uuid : string){
    const [result] = await getConnection().createQueryBuilder()
    .subQuery()
    .select(['user_id'])
    .from(User, 't_user')
    .where('uuid = :uuid', {uuid : uuid})
    .execute();
    return result;
    
  }


  /**
   * find nickname
   * @param userId user id
   * @param userPassword user password
   * @returns uuid
   */
  async findUuid(userId : string, userPassword : string) {
    const [result] = await getConnection().createQueryBuilder()
      .subQuery()
      .select(['uuid'])
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
   * @param uuid : uuid
   * @returns
   */
  async updateUser(
    userName: string,
    userNickname : string,
    userPhoneNumber : string,
    uuid : string) :Promise<any> {
    const result = await getConnection().createQueryBuilder()
    .update(User)
    .set({
      user_name : userName,
      user_nickname : userNickname,
      user_phone_number : userPhoneNumber
    })
    .where('uuid = :uuid', {uuid : uuid})
    .execute();
    return result;
  }

  /**
   * delete user
   * @param uuid
   */
  async deleteUser(uuid : string) : Promise<any> {
    const result = await getConnection().createQueryBuilder()
    .delete()
    .from(User)
    .where('uuid = :uuid', {uuid : uuid})
    .execute();
    return result;
  }

  async getProfile(userId : string){
    const [result] = await getConnection().createQueryBuilder()
    .subQuery()
    .select(['user_name, user_nickname, user_phone_number'])
    .from(User, "t_user")
    .where('user_id = :user_id', {user_id : userId})
    .execute();
    return result;
  }
} 