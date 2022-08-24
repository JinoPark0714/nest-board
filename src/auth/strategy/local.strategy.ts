import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SigninUserDto } from '../../user/dto/signin-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'user_id',
      passwordField : 'user_password'
    });
  }

  async validate(signinUserDto : SigninUserDto): Promise<any> {
    console.log("Local Strategy");
    const user = await this.authService.sign(signinUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}