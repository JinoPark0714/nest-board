import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService{
  constructor(
    private readonly jwtService : JwtService
    ){}

  async sign(user_id : string, user_password : string){
    const payload = {
      user_id : user_id,
      user_password : user_password
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  verify(authorization : string){
    let isVerified = null;
    try {
      const token = authorization.replace('Bearer ', '');
      isVerified = this.jwtService.verify(token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
