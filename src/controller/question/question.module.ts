import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/schema/question.schema';
import { AuthService } from 'src/controller/auth/auth.service';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthSchema } from 'src/schema/auth.schema';
import { FirebaseApp } from 'src/database/firebase-app';
import { FirebaseModule } from 'src/database/firebase.module';
import { AuthModule } from '../auth/auth.module';
import { UserPointsMiddleware } from 'src/Middlewares/user-points.middleware';

@Module({
  imports: [FirebaseModule],

  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule implements NestModule {

configure(consumer: MiddlewareConsumer) {
  consumer.apply(UserPointsMiddleware).forRoutes({path:'questions',method:RequestMethod.POST})
}
}
