import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './infra/mongoose/daatabse.module';

import { AuthModule } from './controller/auth/auth.module';
import { QuestionModule } from './question/question.module';
import { MongooseConfigService } from './infra/mongoose/mongoose-config.service';

@Module({
  imports: [

  ConfigModule.forRoot({isGlobal:true}),
DatabaseModule,
    AuthModule,
    QuestionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
