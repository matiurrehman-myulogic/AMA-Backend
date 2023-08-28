import mongoose from "mongoose";
import { UserSchema } from "src/user/schemas/user.schema";

export interface UserModel extends mongoose.Document {
    Phone_Number: number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Role: string;
    Profile_Pic: string;
    FCMT: string;
  }
  
  export const UserModel = mongoose.model<UserModel>('User', UserSchema);