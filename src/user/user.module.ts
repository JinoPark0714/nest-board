import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './entities/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([UserSchema, UserRepository]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports : [UserService]
})
export class UserModule {}
