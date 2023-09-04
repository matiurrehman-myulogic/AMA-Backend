import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './infra/mongoose/daatabse.module';

import { AuthModule } from './controller/auth/auth.module';

import { MongooseConfigService } from './infra/mongoose/mongoose-config.service';
import { Auth } from './schema/auth.schema';
import { QuestionModule } from './controller/question/question.module';
import { MongooseModelsModule } from './schema/mongoose-models.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    QuestionModule,
    Auth,
    MongooseModelsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
