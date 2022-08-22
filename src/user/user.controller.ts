import { Controller, Post, Body, Delete, UseGuards, Request} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(
    private readonly userService : UserService,
    private readonly authService : AuthService
  ) { }

  @Post()
  @ApiOperation({ summary : `signup User API`, description : `Create User`})
  @ApiCreatedResponse({description : `Create User`, type : CreateUserDto})
  signup(@Body() createUserDto: CreateUserDto) {
    console.log("User API signup");
    const {user_id, user_password, user_name, user_nickname, user_phone_number} = createUserDto;
    return this.userService.signup(user_id, user_password, user_name, user_nickname, user_phone_number);
  }


  // 아이디와 비밀번호를 입력하여 로그인 여부 반환.
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary : `signin User API`, description: `Sign in`})
  @ApiCreatedResponse({description : `Sign in`, type : SigninUserDto})
  async signin(@Body() signinUserDto: SigninUserDto){
    console.log("User API signin");
    const {user_id, user_password} = signinUserDto;
    const user = await this.userService.signin(user_id, user_password);
    if(user)
      return this.authService.sign(user_id, user_password);
    return null;
  }

  @Delete()
  @ApiOperation({summary : `remove User API`, description : `remove`})
  @ApiCreatedResponse({description : `remove`})
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    console.log("User API deleteUser");
    const {user_id} = deleteUserDto;
    return this.userService.deleteUser(user_id);
  }
}
