import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserRepository } from './user.repository';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository : UserRepository, 
    private readonly authService : AuthService){}
  
  async signup(createUserDto: CreateUserDto) {
    const {user_id, user_password, user_name, user_nickname, user_phone_number} = createUserDto;
    return this.userRepository.signup({user_id, user_password, user_name, user_nickname, user_phone_number});
  }

  // 아이디와 비밀번호를 통해 로그인 여부 반환.
  async signin(signinUserDto : SigninUserDto){
    const {user_id, user_password} = signinUserDto;
    const [result] = await this.userRepository.signinORM(user_id, user_password); 
    if(!result)
      throw new NotFoundException("존재하지 않는 사용자입니다.");
    const token = this.authService.sign(user_id);
    return {accessToken : token};
  }

  async deleteUser(deleteUserDto : DeleteUserDto){
    const {user_id} = deleteUserDto;
    return await this.userRepository.deleteUser(user_id);
  }

  isVoid (object){
    return (object.length === 0 || object === null || object.keys().length === 0)
  }
}
