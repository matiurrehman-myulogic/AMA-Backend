import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/AuthGuard/authGuard'; // Import your AuthGuard here
@Injectable()
export class CustomAuthMiddleware implements NestMiddleware {
  constructor(private readonly authGuard: AuthGuard) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
    };
    try {
      const result = await this.authGuard.canActivate(context);
      if (result) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    } catch (error) {
      // Handle any errors that occur during the canActivate operation
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}