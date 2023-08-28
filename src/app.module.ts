import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FirebaseApp } from 'src/firebase/firebase-app';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MongoDbUri),
    BookModule,
  
    ],

  controllers: [AppController],
  providers: [AppService,
    FirebaseApp,  
  ],
})
export class AppModule {}
