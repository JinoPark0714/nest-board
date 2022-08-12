import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [UserModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  
})
export class BoardModule {}
