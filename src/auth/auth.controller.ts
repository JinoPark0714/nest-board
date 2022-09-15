import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Headers } from '@nestjs/common';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService : AuthService){}

  @Post('verification')
  @ApiOperation({summary : `verify API`, description : `verify`})
  @ApiCreatedResponse({description : `verify`})
  verifyUser(@Headers("authorization") authorization : string, @Headers("refresh") refresh : string){
    console.log("Auth API verify");
    return this.authService.verifyToken(authorization, refresh);
  }

}
