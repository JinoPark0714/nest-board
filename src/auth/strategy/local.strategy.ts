import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'uuid'
    });
  }

  // passport-local 인증
  validate(uuid : string): string {
    console.log("Local Strategy");
    const token = this.authService.sign(uuid);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}