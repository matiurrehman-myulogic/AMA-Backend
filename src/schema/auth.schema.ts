import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export const AuthSchema = SchemaFactory.createForClass(Auth);
