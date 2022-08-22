import { Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "Hello Nest.JS";
  }

  @Get('env')
  getEnv() : any{
    const Obj = {
      host : process.env.DATABASE_HOST,
      database : process.env.DATABASE_NAME,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      port : 3306,
      charset : process.env.DATABASE_CHARSET
    };
    return Obj;
  }
}
