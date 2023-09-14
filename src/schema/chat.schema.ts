import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message_Type } from 'src/constants/messageType.constants';
import { Auth } from './auth.schema';
import { Message } from './common/Message.schema';
import { Question } from './question.schema';
@Schema({
  timestamps: true,
})
@Schema()
export class Chat {
  @Prop({ type: [{ type: Types.ObjectId, ref: Question.name }] })
  roomId: Types.ObjectId | Question;

  @Prop({ type: [{ type: Types.ObjectId, ref: Auth.name }] })
  questionerId: Types.ObjectId | Auth;
  @Prop({ type: [{ type: Types.ObjectId, ref: Auth.name }] })
  answererId: Types.ObjectId | Auth;

  @Prop({ type: [{ type: Types.ObjectId, ref: Message }] })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
