import mongoose from "mongoose";
import { AuthSchema } from "src/schema/auth.schema";


export interface AuthModel extends mongoose.Document {
    Phone_Number:string
    FullName:string
  ProfilePic:string
    Email:string
  }
  
  export const AuthModel = mongoose.model<AuthModel>('Auth', AuthSchema);