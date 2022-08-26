import { Controller, Post, Body, Delete, UseGuards, Put, Patch, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  /**
   * 회원 가입 (유저 생성)
   * @param createUserDto 회원 생성 정보
   * @param response 응답 객체
   * @returns 회원 가입 성공 유무
   */
  @Post()
  @ApiOperation({ summary: `signup User API`, description: `Create User` })
  @ApiCreatedResponse({ description: `Create User`, type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto, @Res() response : Response) {
    console.log("User API signup");
    const isCreated = this.userService.signup(createUserDto);
    if(isCreated){
      return response.status(201).json({
        status : 201,
        message : "user created"
      });
    }
    return response.status(500).json({
      status : 500,
      message : "server internal error"
    });
  }


  /**
   * 로그인, 성공 시 jwt 발급
   * @param signinUserDto 로그인 정보
   * @param response 응답 객체
   * @returns 로그인 성공 유무
   */
  @Post('signin')
  @ApiOperation({ summary: `signin User API`, description: `Sign in` })
  @ApiCreatedResponse({ description: `Sign in`, type: SigninUserDto })
  async signin(@Body() signinUserDto: SigninUserDto, @Res() response: Response) {
    console.log("User API signin");
    const user_nickname = await this.userService.findNickname(signinUserDto);
    if (user_nickname) {
      const access_token = this.authService.sign(user_nickname);
      response.setHeader("Authorization", access_token);
      return response.status(201).json({
        status: 201,
        message: 'Logined'
      });
    }
    return response.status(404).json({
      status : 404,
      message : "Not Found"
    });
  }

  // 2022-08-25 1640 코드 보존
  // 로그인, 성공 시 jwt 토큰 발급
  // @Post('signin')
  // @UseGuards(LocalAuthGuard)
  // @ApiOperation({ summary: `signin User API`, description: `Sign in` })
  // @ApiCreatedResponse({ description: `Sign in`, type: SigninUserDto })
  // async signin(@Body() signinUserDto: SigninUserDto, @Res() response: Response) {
  //   console.log("User API signin");
  //   const userNickname = await this.userService.findNickname(signinUserDto);
  //   if (userNickname) {
  //     const access_token = this.authService.sign(signinUserDto);
  //     response.setHeader("Authorization", access_token);
  //     return response.status(201).json({
  //       status: 201,
  //       message: 'Login'
  //     });
  //   }
  //   return null;
  // }


  /**
   * 회원 정보 수정
   * @param request 유저 jwt
   * @param updateUserDto 수정할 회원 정보
   * @returns 회원 정보 수정 성공 유무
   */
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `update User API`, description: `update User` })
  @ApiCreatedResponse({ description: `Update User`, type: null })
  updateUser(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    console.log("User API updateUser");
    const user_nickname = this.authService.getUserNickname(request);
    return this.userService.updateUser(updateUserDto, user_nickname);
  }

  // 비밀번호 변경
  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `Update password User API`, description: `Update password` })
  @ApiCreatedResponse({ description: `Update password` })
  updatePassword(@Req() request: Request) {
    console.log("User API updatePassword");
    const user_nickname = this.authService.getUserNickname(request);
  }

  /**
   * 회원 탈퇴 (유저 삭제)
   * @param request 유저 jwt
   * @param response 응답 객체
   * @returns 탈퇴 유무
   */
  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `delete User API`, description: `delete` })
  @ApiCreatedResponse({ description: `delete` })
  deleteUser(@Req() request: Request, @Res() response : Response) {
    console.log("User API deleteUser");
    const user_nickname = this.authService.getUserNickname(request);
    const isDelete = this.userService.deleteUser(user_nickname);
    if(isDelete){
      return response.status(200).json({
        status : 200,
        message : "user Deleted"
      });
    }
    return response.status(401).json({
      status : 401,
      message : "unauthorized"
    });
  }
}
