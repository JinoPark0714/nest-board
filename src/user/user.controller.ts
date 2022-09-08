import { Controller, Post, Body, Delete, UseGuards, Put, HttpCode, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  /**
   * create user
   * @param createUserDto
   * @returns 
   */
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: `signup User API`, description: `Create User` })
  @ApiCreatedResponse({ description: `Create User`, type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    console.log("User API signup");
    return this.userService.signup(createUserDto);
  }

  @Post('/duplicate')
  @HttpCode(200)
  @ApiOperation({summary : `checkDuplicate User API`, description : `check duplicated`})
  @ApiCreatedResponse({ description : `Check duplicate`})
  checkDuplication(@Body() userId : string){
    return this.userService.checkDuplication(userId);
  }

  /**
   * sign in
   * @param signinUserDto
   * @returns 
   */
  @Post('signin')
  @HttpCode(201)
  @ApiOperation({ summary: `signin User API`, description: `Sign in` })
  @ApiCreatedResponse({ description: `Sign in`, type: SigninUserDto })
  async signin(@Body() signinUserDto: SigninUserDto) {
    console.log("User API signin");
    const uuid = await this.userService.findUuid(signinUserDto);
    const accessToken = this.authService.sign(uuid);
    const refreshToken = this.authService.refresh();
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "Login",
    };
  }


  /**
   * Update User
   * @param updateUserDto
   * @param authorization access token
   * @param refresh refresh token
   * @returns
   */
  @Put()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `update User API`, description: `update User` })
  @ApiCreatedResponse({ description: `Update User`, type: null })
  updateUser(
    @Body() updateUserDto: UpdateUserDto, 
    @Headers("Authorization") authorization : string, 
    @Headers("Refresh") refresh : string) {
    console.log("User API updateUser");
    const uuid = this.authService.getUuid(authorization);
    return this.userService.updateUser(updateUserDto, uuid);
  }


  /**
   * delete user
   * @param authorization access token
   * @returns
   */
  @Delete()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `delete User API`, description: `delete` })
  @ApiCreatedResponse({ description: `delete` })
  deleteUser(@Headers("Authorization") authorization : string) {
    console.log("User API deleteUser");
    const uuid = this.authService.getUuid(authorization);
    return this.userService.deleteUser(uuid);
  }
}
