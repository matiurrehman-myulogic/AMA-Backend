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

@Injectable()
export class UserPointsMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: AuthService,
  ) // private AuthModel: moongose.Model<AuthDocument>,

  {}
  // @UseGuards(AuthGuard)
  async use(req: any, @Res() res: any, next: NextFunction) {
    // const userId =req.payload.id; // You'll need to implement your user authentication and set the user in the request object
    // console.log(req)
    console.log('result2');
    console.log('dddddddd', req.payload.id);
    const user = await this.usersService.findById(req.payload.id);
    console.log('user', user);
    if (user.Points >= 2) {
      next();
    } else {
      res.status(403).json({ message: 'Insufficient points' });
    }
  }
}
