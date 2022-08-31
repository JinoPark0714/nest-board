import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
  async signup(createUserDto : CreateUserDto) : Promise<any>{
    try {
      const {userId, userPassword, userName, userNickname, userPhoneNumber} = createUserDto;
      return await this.userRepository.signup(userId, userPassword, userName, userNickname, userPhoneNumber);
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
      const {userId, userPassword} = signinUserDto;
      const {user_nickname} = await this.userRepository.findNickname(userId, userPassword); 
      return user_nickname;      
    } catch (error) {
      throw new NotFoundException("아이디와 비밀번호를 다시 입력해주세요.");
    }
  }

  /**
   * update user
   * @param updateUserDto 
   * @param userNickname user nickname
   * @returns update status
   */
  async updateUser(updateUserDto : UpdateUserDto, userNickname : string) : Promise<any>{
    try {
      const {userName, userPhoneNumber} = updateUserDto;
      const result = await this.userRepository.updateUser(userName, userPhoneNumber, userNickname);
      return result;
    } catch (error) {
      throw new UnauthorizedException(); 
    }
  }

  /**
   * delete user
   * @param userNickname user nickname
   * @returns delete status
   */
  async deleteUser(userNickname : string) : Promise<boolean>{
    try {
      const result = await this.userRepository.deleteUser(userNickname);
      return result;      
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

}

