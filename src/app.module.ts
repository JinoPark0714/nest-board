import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { MysqlModule } from './mysql/mysql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, BoardModule, MysqlModule, ConfigModule.forRoot({
    envFilePath : (process.env.NODE_ENV === 'production') ? '.production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env',
    isGlobal : true
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
