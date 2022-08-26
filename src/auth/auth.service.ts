import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  // jwt 발급
  sign(user_nickname: string): string {
    const payload = {
      user_nickname: user_nickname
    }
    return this.jwtService.sign(payload);
  }

  // jwt 검증
  verify(authorization: string) {
    try {
      const token = authorization.replace('Bearer ', '');
      const userInfo = this.jwtService.verify(token);
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      console.log(error);
      return "error";
    }

  }

  // jwt를 이용하여 user_id 추출하기
  getUserNickname(request: Request): string {
    const { authorization } = request.headers;
    const { user_nickname } = this.verify(authorization);
    return user_nickname;
  }

}
