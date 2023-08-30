import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './controller/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MongoDbUri),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
//   useFactory:(configService:ConfigModule)=>({
// const username=configService.get("DATABASE_USER");
// const password=configService.get('')

//   }),
  inject:[ConfigService]
    }),
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
