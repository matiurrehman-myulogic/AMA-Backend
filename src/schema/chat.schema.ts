import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Message_Type } from 'src/constants/messageType.constants';
import { Auth } from './auth.schema';
import { Message } from './common/Message.schema';
import { Question } from './question.schema';
import { type } from 'os';
@Schema({
  timestamps: true,
})
@Schema()
export class Chat {
@Prop({ type: Types.ObjectId, ref: Question.name })
roomId: Types.ObjectId;

@Prop({ type: Types.ObjectId, ref: Auth.name })
questionerId: Types.ObjectId;

@Prop({ type: Types.ObjectId, ref: Auth.name })
answererId: Types.ObjectId;

@Prop({ type: Message })
messages: Message[];
}
export type ChatDocument=Chat & Document


export const ChatSchema = SchemaFactory.createForClass(Chat);
