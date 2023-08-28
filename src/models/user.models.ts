import mongoose from "mongoose";
import { UserSchema } from "src/user/schemas/user.schema";

export interface UserModel extends mongoose.Document {
    Phone_Number:string
    FullName:string
  ProfilePic:string
    Email:string
  }
  
  export const UserModel = mongoose.model<UserModel>('User', UserSchema);