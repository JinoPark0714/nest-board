import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService : ConfigService
  ) { }

  /**
   * sign access token
   * @param uuid uuid
   * @returns token type of string
   */
  sign(uuid: string): string {
    const payload = {
      uuid: uuid
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
      secret : this.configService.get('SECRET_KEY'),
      expiresIn : this.configService.get('REFRESH_TOKEN_EXPIRES_IN')
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
  getUuid(authorization: string): string {
    const { uuid } = this.verifyAccessToken(authorization);
    return uuid;
  }

}
