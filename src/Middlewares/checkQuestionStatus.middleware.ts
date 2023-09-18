import {
  Injectable,
  NestMiddleware,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthModule } from 'src/controller/auth/auth.module';
import { AuthService } from 'src/controller/auth/auth.service';
import { AuthDocument } from 'src/schema/auth.schema';
import * as moongose from 'mongoose';
import { QuestionService } from 'src/controller/question/question.service';
import { User_Status } from 'src/constants';

@Injectable()
export class CheckQuestionStatusMiddleware implements NestMiddleware {
  constructor(private readonly questionService: QuestionService) {}
  async use(req: any, @Res() res: any, next: NextFunction) {
    const question = await this.questionService.findById(req.payload.id);
    console.log('user', question);
    if (question.status == User_Status.OPEN) {
      next();
    } else if (question.status == User_Status.CLOSE) {
      res
        .status(403)
        .json({
          message:
            'The question is already resolved successfully.Please try answering other unresolved questions',
        });
    } else if (question.status == User_Status.INPROGRESS) {
      res
        .status(403)
        .json({ message: 'The question is currently in progress' });
    } else {
      res.status(403).json({ message: 'The state is undefined' });
    }
  }
}
