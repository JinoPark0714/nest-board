import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { common } from '../util/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository : UserRepository, 
  ){}
  
  /**
   * create user
   * @param createUserDto user infomation
   * @returns apply status
   */
  async signup(createUserDto : CreateUserDto) {
    try {
      const {user_id, user_password, user_name, user_nickname, user_phone_number} = createUserDto;
      return await this.userRepository.signup({user_id, user_password, user_name, user_nickname, user_phone_number});
    } catch (error) {
      throw new BadRequestException("이미 정보가 존재합니다.");
    }
  }

  /**
   * find nickname
   * @param signinUserDto signin infomation 
   * @returns nickname (string)
   */
  async findNickname(signinUserDto : SigninUserDto) : Promise<any>{
    try {
      const {user_id, user_password} = signinUserDto;
      const {user_nickname} = await this.userRepository.findNickname(user_id, user_password); 
      return user_nickname;      
    } catch (error) {
      throw new NotFoundException("아이디와 비밀번호를 다시 입력해주세요.");
    }
  }

  // 2022-08-25 1640 코드 보존
  // 아이디와 비밀번호를 통해 로그인 여부 반환.
  // async signin(signinUserDto : SigninUserDto) : Promise<any>{
  //   const {user_id, user_password} = signinUserDto;
  //   const result = await this.userRepository.signinORM(user_id, user_password); 
  //   if(!result)
  //     throw new NotFoundException("아이디와 비밀번호를 다시 입력해주세요.");
  //   return result;
  // }

  responseToken(accessToken : string, refreshToken : string) : Object{
    const responseInfomation = {
      accessToken : accessToken,
      refreshToken : refreshToken,
      message : "Login"
    };
    return responseInfomation;
  }


  /**
   * 회원 정보 수정
   * @param updateUserDto 수정할 회원 정보
   * @param user_nickname 유저 닉네임 (식별자)
   * @returns 성공 유무
   */
  async updateUser(updateUserDto : UpdateUserDto, user_nickname_id : string) : Promise<boolean>{
    const {user_name, user_nickname, user_phone_number} = updateUserDto;
    const result = await this.userRepository.updateUser([user_name, user_nickname, user_phone_number, user_nickname_id]);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);
  }

  /**
   * 회원 탈퇴
   * @param user_nickname 유저 닉네임 (식별자)
   * @returns 성공 유무
   */
  async deleteUser(user_nickname : string) : Promise<boolean>{
    const result = await this.userRepository.deleteUser(user_nickname);
    const {affectedRows} = result;
    return common.isSuccess(affectedRows);
  }

}

