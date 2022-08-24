import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [UserModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  
})
export class BoardModule {}
