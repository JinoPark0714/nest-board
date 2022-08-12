import { Controller, Post, Body, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary : `signup User API`, description : `Create User`})
  @ApiCreatedResponse({description : `Create User`, type : CreateUserDto})
  signup(@Body() createUserDto: CreateUserDto) {
    console.log("User API signup");
    return this.userService.signup(createUserDto);
  }


  // 아이디와 비밀번호를 입력하여 로그인 여부 반환.
  @Post('signin')
  @ApiOperation({summary : `signin User API`, description: `Sign in`})
  @ApiCreatedResponse({description : `Sign in`, type : SigninUserDto})
  signin(@Body() signinUserDto: SigninUserDto) {
    console.log("User API signin");
    return this.userService.signin(signinUserDto);
  }


  @Delete()
  @ApiOperation({summary : `remove User API`, description : `remove`})
  @ApiCreatedResponse({description : `remove`})
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    console.log("User API deleteUser");
    return this.userService.deleteUser(deleteUserDto);
  }
}
