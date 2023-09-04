import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Auth {
  @Prop()
  Phone_Number: string;
  @Prop()
  FullName: string;
  @Prop()
  ProfilePic: string;
  @Prop()
  Email: string;
}
export type AuthDocument= Auth & Document


export const AuthSchema = SchemaFactory.createForClass(Auth);
