import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService : ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  async validate(access : any, refresh : any) {
    console.log("Jwt strategy");
    const isTrueAccess = this.validateAccess(access);
    const isTrueRefresh = this.validateRefresh(refresh);
    if(isTrueAccess && isTrueRefresh)
      return { uuid: access.uuid };
  }

  async validateAccess(access : any){
    console.log("validate access token");
    return true;
  }

  async validateRefresh(refresh : any){
    console.log("validate refresh token");
    return true;
  }
}