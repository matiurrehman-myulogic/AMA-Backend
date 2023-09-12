// custom-auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/AuthGuard/authGuard'; // Import your AuthGuard here

@Injectable()
export class CustomAuthMiddleware implements NestMiddleware {
  constructor(private readonly authGuard: AuthGuard) {}

  use(req: Request, res: Response, next: NextFunction) {
    // You can perform any custom logic here before calling the AuthGuard
    // For example, you can modify the request object or perform other checks

    // Call the AuthGuard's canActivate method
    const context :any= {
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => res,
        }),
      };

    this.authGuard.canActivate(context).then((result) => {
        if (result) {
          // Authentication succeeded, continue with the next middleware
          console.log("resu=lt",result)
          next();
        } else {
          // Authen=tication failed, you can handle it as needed
          res.status(403).send('Forbidden');
        }
      })
  }
}