import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'user_id',
      passwordField : 'user_password'
    });
  }

  async validate(user_id: string, user_password: string): Promise<any> {
    console.log("Local Strategy");
    const user = await this.authService.sign(user_id, user_password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}