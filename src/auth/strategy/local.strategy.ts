import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'user_nickname'
    });
  }

  // passport-local 인증
  validate(user_nickname : string): string {
    console.log("Local Strategy");
    const token = this.authService.sign(user_nickname);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}