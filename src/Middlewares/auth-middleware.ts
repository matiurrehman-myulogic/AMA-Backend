// custom-auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/AuthGuard/authGuard'; // Import your AuthGuard here

@Injectable()
export class CustomAuthMiddleware implements NestMiddleware {
  constructor(private readonly authGuard: AuthGuard) {}

  use(req: Request, res: Response, next: NextFunction) {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
    };

    this.authGuard.canActivate(context).then((result) => {
      if (result) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
  }
}
