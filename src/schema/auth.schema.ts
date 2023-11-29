import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Location, LocationSchema } from './common/location.schema';
import { DefinedLocation, DefinedLocationSchema } from './common/stateCityLocation.schema';

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
  // @Prop({type:DefinedLocationSchema})
  // Location:DefinedLocation;
  @Prop({ default:10,required:true})
  Points:number;
  @Prop()
  FCM:string;

}
export type AuthDocument= Auth & Document


export const AuthSchema = SchemaFactory.createForClass(Auth);
