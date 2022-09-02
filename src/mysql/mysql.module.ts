import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService : ConfigService)=>({
        type : 'mysql',
        host : configService.get('DATABASE_HOST'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        port: 3306,
        synchronize: true,
        charset: configService.get('DATABASE_CHARSET'),
        entities: [User]
      }),
    })
  ]
})
export class MysqlModule { }