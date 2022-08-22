import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService : AuthService){}

  @Post('verify')
  @ApiOperation({summary : `verify API`, description : `verify`})
  @ApiCreatedResponse({description : `verify`})
  verifyUser(@Req() request : Request){
    console.log("Auth API verify");
    const { authorization} = request.headers;
    return this.authService.verify(authorization);
  }
}
