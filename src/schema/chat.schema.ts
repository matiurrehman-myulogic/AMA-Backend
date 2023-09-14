import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message_Type } from 'src/constants/messageType.constants';
import { Auth } from './auth.schema';
import { Message } from './common/Message.schema';
@Schema({
    timestamps: true,
  })
@Schema()
export class Chat {
  @Prop()
  roomId: string;
  @Prop({
    required: true,
    type:String,
    enum:Object.keys(Message_Type),
    default:Message_Type.TEXT
  
  }) 
  messageType: Message_Type;
  @Prop({ type: [{ type: Types.ObjectId, ref:Auth.name }] })
  participants: Types.ObjectId[]|Auth[];


  @Prop({ type: [{ type: Types.ObjectId, ref: Message }] })
  messages: Message[];
}


export const ChatSchema = SchemaFactory.createForClass(Message);