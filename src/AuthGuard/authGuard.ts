import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';

  import * as firebase from 'firebase-admin';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import * as moongose from 'mongoose';
import { Auth } from 'src/schema/auth.schema';
import { FirebaseApp } from 'src/database/firebase-app';
  @Injectable()
  export class AuthGuard implements CanActivate {
    private auth: firebase.auth.Auth;
    constructor(
      @InjectModel(Auth.name)
      private UserModel: moongose.Model<Auth>,
      private firebaseApp: FirebaseApp,
    ) {
      this.auth = firebaseApp.getAuth();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (token != null && token != '') {
        try {
          const decodedToken = await this.auth.verifyIdToken(
            token.replace('Bearer ', ''),
          );
          console.log('decodedToken', decodedToken);
          const phone = parseInt(decodedToken.phone_number.substring(3));
          console.log('phone', phone);
          const userDetails = await this.UserModel.findOne({
            Phone_Number: `+91${phone}`,
          });
          console.log('ud', phone);
          if (userDetails) {
            return true;
          }
        } catch (error) {
          console.log(error);
          throw new UnauthorizedException(`Authorization header is required`);
        }
      }
      return false;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }