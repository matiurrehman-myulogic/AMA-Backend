import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { FirebaseApp } from 'src/firebase/firebase-app';
  import * as firebase from 'firebase-admin';
import { UserModel } from 'src/models/user.models';

  @Injectable()
  export class AuthGuard implements CanActivate {
    private auth: firebase.auth.Auth;
  
    constructor(
    
 
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
          const phone = parseInt(decodedToken.phone_number.substring(3));
  
          const userDetails = await UserModel.findOne({
            Phone_Number: phone,
          });
          if (userDetails) {
            // request['payload'] = {
            //   id: userDetails.id,
            //   phone_number: phone,
            //   first_name: userDetails.First_Name,
            //   last_name: userDetails.Last_Name,
            //   email: userDetails.Email,
            //   role: userDetails.Role,
            //   profile_pic: userDetails.Profile_Pic,
            //   token: token,
            //   FCMT: userDetails.FCMT,
            // };
            console.log(userDetails)
            return true;
          }
        } catch (error) {
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
  