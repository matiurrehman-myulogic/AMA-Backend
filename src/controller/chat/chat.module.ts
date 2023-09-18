import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { FirebaseModule } from 'src/database/firebase.module';
import { CustomAuthMiddleware } from 'src/Middlewares/auth-middleware';
import { CheckQuestionStatusMiddleware } from 'src/Middlewares/checkQuestionStatus.middleware';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [FirebaseModule],

  controllers: [ChatController],
  providers: [ChatService,AuthGuard,AuthService,QuestionService],
})

export class ChatModule implements NestModule {
  // @UseGuards(AuthGuard)
  configure(consumer: MiddlewareConsumer) {

    consumer
    .apply(CustomAuthMiddleware) // Apply your AuthGuard first
    .forRoutes({ path: '*', method: RequestMethod.ALL })
    .apply(CheckQuestionStatusMiddleware) // Apply your middleware to the same route
    .forRoutes({ path: 'chat/create', method: RequestMethod.POST });
  }
  }