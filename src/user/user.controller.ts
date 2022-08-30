import { Controller, Post, Body, Delete, UseGuards, Put, Patch, Req, Res, HttpCode } from '@nestjs/common';
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
  @HttpCode(201)
  @ApiOperation({ summary: `signup User API`, description: `Create User` })
  @ApiCreatedResponse({ description: `Create User`, type: CreateUserDto })
  async signup(@Body() createUserDto: CreateUserDto) {
    console.log("User API signup");
    const isCreated = await this.userService.signup(createUserDto);
    console.log(isCreated);
    return {
      statusCode : 201,
      message : "user created"
    };
  }


  /**
   * 로그인, 성공 시 jwt 발급
   * @param signinUserDto 로그인 정보
   * @param response 응답 객체
   * @returns 로그인 성공 유무
   */
  @Post('signin')
  @HttpCode(201)
  @ApiOperation({ summary: `signin User API`, description: `Sign in` })
  @ApiCreatedResponse({ description: `Sign in`, type: SigninUserDto })
  async signin(@Body() signinUserDto: SigninUserDto) {
    console.log("User API signin");
    const userNickname = await this.userService.findNickname(signinUserDto);
    const accessToken = this.authService.sign(userNickname);
    const refreshToken = this.authService.refresh();
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "Login",
    };
  }


  /**
   * 회원 정보 수정
   * @param request 유저 jwt
   * @param updateUserDto 수정할 회원 정보
   * @returns 회원 정보 수정 성공 유무
   */
  @Put()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `update User API`, description: `update User` })
  @ApiCreatedResponse({ description: `Update User`, type: null })
  updateUser(@Req() request: Request, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
    console.log("User API updateUser");
    const user_nickname = this.authService.getUserNickname(request);
    const isUpdated = this.userService.updateUser(updateUserDto, user_nickname);
    if (isUpdated) {
      return response.status(201).json({
        status: 201,
        message: "user updated"
      });
    }
    return response.status(500).json({
      status: 500,
      message: "server internal error"
    });
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
  deleteUser(@Req() request: Request, @Res() response: Response) {
    console.log("User API deleteUser");
    const user_nickname = this.authService.getUserNickname(request);
    const isDelete = this.userService.deleteUser(user_nickname);
    if (isDelete) {
      return response.status(200).json({
        status: 200,
        message: "user Deleted"
      });
    }
    return response.status(401).json({
      status: 401,
      message: "unauthorized"
    });
  }
}
