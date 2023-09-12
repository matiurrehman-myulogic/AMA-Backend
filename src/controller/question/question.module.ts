import { MiddlewareConsumer, Module, NestModule, RequestMethod, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { PreAuthMiddleware } from './../../database/pre-auth-middleware';
import { CustomAuthMiddleware } from 'src/Middlewares/auth-middleware';

@Module({
  imports: [FirebaseModule],

  controllers: [QuestionController],
  providers: [QuestionService,AuthService,AuthGuard],
})
export class QuestionModule implements NestModule {
// @UseGuards(AuthGuard)
configure(consumer: MiddlewareConsumer) {

  consumer
  .apply(CustomAuthMiddleware) // Apply your AuthGuard first
  .forRoutes({ path: 'questions/add', method: RequestMethod.POST })
  .apply(UserPointsMiddleware) // Apply your middleware to the same route
  .forRoutes({ path: 'questions/add', method: RequestMethod.POST });
}
}
