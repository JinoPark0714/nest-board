import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      inject : [ConfigService],
      useFactory : (configService : ConfigService) => ({
        secret : configService.get('SECRET_KEY'),
        signOptions : {expiresIn : configService.get('ACCESS_TOKEN_EXPIRES_IN')},
      })
    }),
  ],
  controllers : [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
