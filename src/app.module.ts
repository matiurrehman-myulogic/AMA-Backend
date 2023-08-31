import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './controller/auth/auth.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
MongooseModule.forRootAsync({
  imports:[ConfigModule],
  useFactory:(configService:ConfigService)=>{
const username=configService.get('DATABASE_NAME')
const password=configService.get('DATABASE_PASSWORD')
const db=configService.get('DATABASE_DB')
const host=configService.get('DATABASE_HOST')
const uri=`mongodb+srv://${username}:${password}@${host}.mongodb.net/${db}?retryWrites=true&w=majority`;

return{
  uri
}
  },
  inject:[ConfigService]

}),

    AuthModule,
    QuestionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
