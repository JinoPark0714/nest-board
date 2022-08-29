import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports : [
    PassportModule,
    JwtModule.register({
      secret : process.env.SECRET_KEY,
      signOptions : {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN},
    }),
  
  ],
  controllers : [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
