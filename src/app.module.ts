import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { MysqlModule } from './mysql/mysql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, BoardModule, MysqlModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
