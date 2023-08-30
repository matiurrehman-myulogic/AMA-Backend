import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './controller/auth/auth.service';
import { AuthModule } from './controller/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MongoDbUri),
    AuthModule,
  ],

  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
