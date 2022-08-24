import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../user/dto/signin-user.dto';

@Injectable()
export class AuthService{
  constructor(
    private readonly jwtService : JwtService
    ){}

  async sign(signinUserDto : SigninUserDto){
    const {user_id, user_password} = signinUserDto;
    const payload = {
      user_id : user_id,
      user_password : user_password
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  verify(authorization : string){
    let isVerified = false;
    try {
      const token = authorization.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      delete userInfo.user_password;
      return userInfo;
    } catch (error) {
      console.log(error);
      isVerified = false;
    }
    return isVerified;
  }

}
