import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository : UserRepository, 
  ){}
  
  async signup(
    user_id : string, 
    user_password : string, 
    user_name : string, 
    user_nickname : string, 
    user_phone_number : string) {
    return this.userRepository.signup({user_id, user_password, user_name, user_nickname, user_phone_number});
  }

  // 아이디와 비밀번호를 통해 로그인 여부 반환.
  async signin(user_id : string, user_password : string){
    const result = await this.userRepository.signinORM(user_id, user_password); 
    if(!result)
      throw new NotFoundException("존재하지 않는 사용자입니다.");
    return result;
  }

  async deleteUser(user_id : string){
    return await this.userRepository.deleteUser(user_id);
  }
}
