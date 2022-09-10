import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, SigninUserDto, UpdateUserDto, DuplicateUserDto } from './dto';
import { v4 as uuid } from 'uuid';

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
      const result = await this.userRepository.signup(userId, userPassword, userName, userNickname, userPhoneNumber, uuid());
      if(result){
        return true;
      }
    } catch (error) {
      // throw new BadRequestException("잘못된 요청입니다.");
      const {code} = error;
      switch(code){
        case "ER_DUP_ENTRY" : 
          throw new BadRequestException("ID is duplicated");          
        
        default:
          throw new BadRequestException();
      }
    }
  }

  /**
   * check user id duplication
   * @param duplicateUserDto
   * @returns boolean
   */
  async checkDuplication  (duplicateUserDto : DuplicateUserDto) : Promise<any>{
    try {
      const {userId} = duplicateUserDto;
      const result = await this.userRepository.findUserId(userId);
      if(result){
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  /**
   * find nickname
   * @param signinUserDto signin infomation 
   * @returns nickname (string)
   */
  async findUuid(signinUserDto : SigninUserDto) : Promise<any>{
    try {
      const {userId, userPassword} = signinUserDto;
      const {uuid} = await this.userRepository.findUuid(userId, userPassword); 
      return uuid;      
    } catch (error) {
      console.log(error);
      throw new NotFoundException("아이디와 비밀번호를 다시 입력해주세요.");
    }
  }

  /**
   * update user
   * @param updateUserDto 
   * @param uuid
   * @returns update status
   */
  async updateUser(updateUserDto : UpdateUserDto, uuid : string) : Promise<any>{
    try {
      const {userName, userNickname, userPhoneNumber} = updateUserDto;
      const result = await this.userRepository.updateUser(userName, userNickname, userPhoneNumber, uuid);
      return result;
    } catch (error) {
      throw new UnauthorizedException(); 
    }
  }

  /**
   * delete user
   * @param uuid 
   * @returns delete status
   */
  async deleteUser(uuid : string) : Promise<any>{
    try {
      const result = await this.userRepository.deleteUser(uuid);
      if(result){
        return {
          status_code : 201,
          message : "user deleted"
        };
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

}

