import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FirebaseApp } from 'src/firebase/firebase-app';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
// import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MongoDbUri),
    BookModule,
  UserModule
    ],

  controllers: [AppController],
  providers: [AppService,
      
  

  ],
})
export class AppModule {}
