import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { BadRequestException } from '@nestjs/common';


// 가짜 함수 정의
const mockRepository = () => ({
  signup: jest.fn(),
  findUuid: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
});

// 모듈 지정 코드
type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;


describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(UserRepository),
        useValue: mockRepository()
      }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserRepository));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe("1. signup test", () => {
    const newUser: CreateUserDto = {
      userId: 'test',
      userPassword: 'test',
      userName: '테스트',
      userNickname: '테스트팍',
      userPhoneNumber: '010-1234-1234'
    };

    const voidUser : CreateUserDto = {
      userId: '',
      userPassword: 'test',
      userName: '테스트',
      userNickname: '테스트팍',
      userPhoneNumber: '010-1234-1234'
    }
    const successSignup = true;

    it('if success signup, should return true.', async () => {
      userRepository.signup.mockResolvedValue(successSignup);
      const result = await userService.signup(newUser);
      expect(result).toEqual(successSignup);
    });

    it('if anything is void, should throw BadRequestException', async () => {
      userRepository.signup.mockRejectedValue(new BadRequestException());
      const result = async () => {
        await userService.signup(voidUser);
      }
      await expect(result).rejects.toThrow(new BadRequestException());
    });
  });

  describe("2. signin test", ()=>{
    const user : SigninUserDto = {
      userId : 'test',
      userPassword : 'test'
    };
    it('if success signin, should return token', async()=>{
      userRepository.findUuid.mockRejectedValue(true);
    });
  });

});