import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [UserModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  
})
export class BoardModule {}
