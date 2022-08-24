import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { common } from '../util/common';

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
  async signin(signinUserDto : SigninUserDto) : Promise<any>{
    const {user_id, user_password} = signinUserDto;
    const result = await this.userRepository.signinORM(user_id, user_password); 
    if(!result)
      throw new NotFoundException("아이디와 비밀번호를 다시 입력해주세요.");
    return result;
  }

  // 회원 정보 수정
  async updateUser(updateUserDto : UpdateUserDto, user_id : string) : Promise<boolean>{
    const {user_name, user_nickname, user_phone_number} = updateUserDto;
    const result = await this.userRepository.updateUser([user_name, user_nickname, user_phone_number, user_id]);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);
  }

  // 회원 탈퇴
  async deleteUser(user_id : string) : Promise<boolean>{
    const result = await this.userRepository.deleteUser(user_id);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);
  }

}

