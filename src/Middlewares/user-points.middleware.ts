import { Injectable, NestMiddleware,Req ,Res} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/controller/auth/auth.service';

@Injectable()
export class UserPointsMiddleware implements NestMiddleware {
  constructor(private readonly usersService: AuthService) {}

  async use(@Req() req: any, @Res() res: any, next: NextFunction) {
    const userId =req.payload.id; // You'll need to implement your user authentication and set the user in the request object

    try {
      const user = await this.usersService.findById(userId);

      if (user.Points >= 2) {
        next();
      } else {
        res.status(403).json({ message: 'Insufficient points' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}