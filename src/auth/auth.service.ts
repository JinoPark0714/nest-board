import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  /**
   * sign access token
   * @param user_nickname user nickname
   * @returns token type of string
   */
  sign(user_nickname: string): string {
    const payload = {
      user_nickname: user_nickname
    }
    return this.jwtService.sign(payload);
  }

  /**
   * verify access token
   * @param authorization access token
   * @returns access token infomation
   */
  verifyAccessToken(authorization: string) : any {
    try {
      const token = authorization.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      return userInfo;
    } catch (error) {
      console.log(error);
      return {
        status : 401,
        message : "Unauthorized"
      };
    }

  }

  /**
   * sign refresh token 
   * @returns refresh token infomation
   */
  refresh() : string{
    const signOptions = {
      secret : process.env.SECRET_KEY,
      expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN
    };
    return this.jwtService.sign({}, signOptions);
  }

  /**
   * vrefiry refresh token
   * @param refreshToken refresh token that type of string 
   * @returns refresh token infomation
   */
  verifyRefreshToken(refreshToken) : Object{
    try {
      const token = refreshToken.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      return userInfo;
    } catch (error) {
      console.log(error);
      return {
        status : 401,
        message : "Unauthorized"
      };
    }

  }

  // jwt를 이용하여 user_id 추출하기
  getUserNickname(authorization: string): string {
    const { user_nickname } = this.verifyAccessToken(authorization);
    return user_nickname;
  }

}
