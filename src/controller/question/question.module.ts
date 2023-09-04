import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/schema/question.schema';
import { AuthService } from 'src/controller/auth/auth.service';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthSchema } from 'src/schema/auth.schema';
import { FirebaseApp } from 'src/database/firebase-app';
import { FirebaseModule } from 'src/database/firebase.module';

@Module({
  imports: [FirebaseModule],

  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
