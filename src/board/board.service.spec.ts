import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { BoardRepository} from './board.repository';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository : BoardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService, BoardRepository],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<BoardRepository>(BoardRepository);
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
  });
});
