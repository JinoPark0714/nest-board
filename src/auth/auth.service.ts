import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService : ConfigService
  ) { }

  /**
   * verify token
   * @param authorization access token 
   * @param refresh refresh token
   */
  verifyToken(authorization : string, refresh : string){
    const accessTokenInfomation = this.verifyAccessToken(authorization);
    const refreshTokenInfomation = this.verifyRefreshToken(refresh);
    return {
      access : accessTokenInfomation,
      refresh : refreshTokenInfomation
    };
  }

  /**
   * sign access token
   * @param uuid uuid
   * @returns token type of string
   */
  sign(uuid: string): string {
    const payload = {
      uuid: uuid
    };
    return this.jwtService.sign(payload);
  }

  /**
   * verify access token
   * @param authorization access token
   * @returns access token infomation
   */
  verifyAccessToken(authorization: string) {
    try {
      const token = authorization.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      return userInfo;
    } catch (error) {
      console.log('토큰이 만료됐습니다.');
      return false;
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
  verifyRefreshToken(refreshToken) {
    try {
      const token = refreshToken.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      return userInfo;
    } catch (error) {
      return false;
    }

  }

  // jwt를 이용하여 user_id 추출하기
  getUuid(authorization: string): string {
    const { uuid } = this.verifyAccessToken(authorization);
    return uuid;
  }



}
