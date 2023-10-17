import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Auth } from './auth.schema';
import { Document } from 'mongoose';
import { User_Status } from 'src/constants/user.constants';
import { Location, LocationSchema } from './common/location.schema';
import {
  DefinedLocation,
  DefinedLocationSchema,
} from './common/stateCityLocation.schema';
@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ type: Types.ObjectId, ref: Auth.name, required: true })
  userId: Types.ObjectId | Auth;
  @Prop({ type: Types.ObjectId, ref: Auth.name })
  answererId: Types.ObjectId | Auth;
  @Prop({ required: true })
  question: string;
  @Prop()
  answer: string;
  @Prop()
  voice: string;
  @Prop({ default: [] })
  tags: string[];
  @Prop()
  pic: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.keys(User_Status),
    default: User_Status.OPEN,
  })
  status: User_Status;


  @Prop({
    type: {
      type: String,
      enum: ['Point'], 
      required: true,
  
    },
    coordinates: {
      type: [Number], // Specify coordinates as [longitude, latitude]
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };
}

export type QuentionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);


QuestionSchema.index({ 'location.coordinates': '2dsphere' });
QuestionSchema.index({ question: 'text' });
