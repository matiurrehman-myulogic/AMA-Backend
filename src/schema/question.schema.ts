import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Auth } from './auth.schema';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop ({type:Types.ObjectId,ref:Auth.name,required:true})
  userId:Types.ObjectId|Auth;
  @Prop()
  question: string;
  @Prop()
  tags:string[];
  @Prop()
  pic:string;
  @Prop()
  location:string;
}
export type QuentionDocument= Question & Document
export const    QuestionSchema = SchemaFactory.createForClass(Question);
